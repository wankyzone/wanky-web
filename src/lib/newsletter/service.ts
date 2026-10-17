import { createHash, createHmac, randomBytes } from "node:crypto";
import type {
  NewsletterMailer,
  NewsletterRepository,
  TokenResult,
} from "./contracts";

const EMAIL_PATTERN = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/;
const CONFIRMATION_LIFETIME_MS = 24 * 60 * 60 * 1000;

export class NewsletterInputError extends Error {}
export class NewsletterDeliveryError extends Error {}
export class NewsletterRateLimitError extends Error {}

export function normalizeNewsletterEmail(value: unknown): string {
  if (typeof value !== "string") {
    throw new NewsletterInputError("Enter a valid email address.");
  }

  const email = value.trim().toLowerCase();
  const [localPart] = email.split("@");

  if (
    email.length > 254 ||
    !EMAIL_PATTERN.test(email) ||
    !localPart ||
    localPart.length > 64
  ) {
    throw new NewsletterInputError("Enter a valid email address.");
  }

  return email;
}

export function hashNewsletterToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function hashRateLimitKey(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function createNewsletterToken(): string {
  return randomBytes(32).toString("base64url");
}

export function isNewsletterToken(value: unknown): value is string {
  return typeof value === "string" && TOKEN_PATTERN.test(value);
}

export class NewsletterService {
  constructor(
    private readonly repository: NewsletterRepository,
    private readonly mailer: NewsletterMailer,
    private readonly siteUrl: string,
    private readonly rateLimitSecret: string,
    private readonly now: () => Date = () => new Date(),
    private readonly createToken: () => string = createNewsletterToken,
  ) {}

  async subscribe(value: unknown, consent: unknown, clientAddress: string) {
    const email = normalizeNewsletterEmail(value);

    if (consent !== true) {
      throw new NewsletterInputError("Consent is required to subscribe.");
    }

    const addressKey = hashRateLimitKey(`ip:${clientAddress}`, this.rateLimitSecret);
    const emailKey = hashRateLimitKey(`email:${email}`, this.rateLimitSecret);
    const [addressAllowed, emailAllowed] = await Promise.all([
      this.repository.consumeRateLimit(addressKey, 5),
      this.repository.consumeRateLimit(emailKey, 3),
    ]);

    if (!addressAllowed || !emailAllowed) {
      throw new NewsletterRateLimitError("Too many subscription requests.");
    }

    const confirmationToken = this.createToken();
    const unsubscribeToken = this.createToken();
    const confirmationTokenHash = hashNewsletterToken(confirmationToken);
    const unsubscribeTokenHash = hashNewsletterToken(unsubscribeToken);
    const confirmationExpiresAt = new Date(
      this.now().getTime() + CONFIRMATION_LIFETIME_MS,
    ).toISOString();
    const state = await this.repository.requestSubscription({
      email,
      confirmationTokenHash,
      unsubscribeTokenHash,
      confirmationExpiresAt,
    });

    if (state !== "confirmation_required") {
      return { accepted: true as const };
    }

    try {
      await this.mailer.sendConfirmation({
        email,
        confirmationToken,
        unsubscribeToken,
        idempotencyKey: `wanky-newsletter-confirm-${confirmationTokenHash}`,
      });
    } catch {
      await this.repository.clearFailedConfirmation(confirmationTokenHash);
      throw new NewsletterDeliveryError("Confirmation delivery failed.");
    }

    return { accepted: true as const };
  }

  async confirm(
  confirmationToken: unknown,
  unsubscribeToken: unknown,
): Promise<TokenResult> {
  if (
    !isNewsletterToken(confirmationToken) ||
    !isNewsletterToken(unsubscribeToken)
  ) {
    return "invalid";
  }

  const confirmationTokenHash = hashNewsletterToken(confirmationToken);
  const unsubscribeTokenHash = hashNewsletterToken(unsubscribeToken);

  const result =
    await this.repository.confirmSubscription(confirmationTokenHash);

  if (result !== "confirmed") return result;

  const claim = await this.repository.claimWelcomeDelivery(
    confirmationTokenHash,
    unsubscribeTokenHash,
  );

  if (!claim) return "confirmed";

  try {
    await this.mailer.sendWelcome({
      email: claim.email,
      unsubscribeToken,
      idempotencyKey: claim.deliveryKey,
    });
  } catch {
    try {
      await this.repository.finishWelcomeDelivery(
        confirmationTokenHash,
        unsubscribeTokenHash,
        false,
      );
    } catch {
      // Preserve the original delivery failure.
    }

    throw new NewsletterDeliveryError("Welcome delivery failed.");
  }

  let recorded: boolean;
  try {
    recorded = await this.repository.finishWelcomeDelivery(
      confirmationTokenHash,
      unsubscribeTokenHash,
      true,
    );
  } catch {
    throw new NewsletterDeliveryError(
      "Welcome delivery status could not be recorded.",
    );
  }

  if (!recorded) {
    throw new NewsletterDeliveryError(
      "Welcome delivery status could not be recorded.",
    );
  }

  return "confirmed";
}

  async unsubscribe(token: unknown): Promise<TokenResult> {
    if (!isNewsletterToken(token)) return "invalid";
    return this.repository.unsubscribe(hashNewsletterToken(token));
  }

  async getConfirmedRecipients(): Promise<string[]> {
    return this.repository.listConfirmedRecipients();
  }
}