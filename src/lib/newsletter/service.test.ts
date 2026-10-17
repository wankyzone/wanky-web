import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";
import type {
  NewsletterMailer,
  NewsletterRepository,
  SubscriptionRequestState,
  TokenResult,
} from "./contracts";
import {
  NewsletterDeliveryError,
  NewsletterInputError,
  NewsletterRateLimitError,
  NewsletterService,
} from "./service";

class FakeRepository implements NewsletterRepository {
  state: SubscriptionRequestState = "confirmation_required";
  tokenResult: TokenResult = "confirmed";
  rateAllowed = true;
  requested: Parameters<NewsletterRepository["requestSubscription"]>[0][] = [];
  clearedTokens: string[] = [];
  rateKeys: string[] = [];

  async consumeRateLimit(keyHash: string) {
    this.rateKeys.push(keyHash);
    return this.rateAllowed;
  }

  async requestSubscription(
    input: Parameters<NewsletterRepository["requestSubscription"]>[0],
  ) {
    this.requested.push(input);
    return this.state;
  }

  async clearFailedConfirmation(tokenHash: string) {
    this.clearedTokens.push(tokenHash);
  }

  async confirmSubscription() {
    return this.tokenResult;
  }

  async unsubscribe() {
    return this.tokenResult;
  }

  async listConfirmedRecipients() {
    return ["member@example.com"];
  }
}

describe("NewsletterService", () => {
  let repository: FakeRepository;
  let mailer: NewsletterMailer;
  let sendConfirmation: Mock<(input: Parameters<NewsletterMailer["sendConfirmation"]>[0]) => Promise<void>>;
  let service: NewsletterService;

  beforeEach(() => {
    repository = new FakeRepository();
    sendConfirmation = vi.fn().mockResolvedValue(undefined);
    mailer = {
      sendConfirmation: async (input) => {
        await sendConfirmation(input);
      },
    };
    let tokenNumber = 0;
    service = new NewsletterService(
      repository,
      mailer,
      "https://wanky-web.vercel.app",
      "test-only-token-secret",
      () => new Date("2026-10-17T12:00:00.000Z"),
      () => `test-token-${String(++tokenNumber).padStart(32, "0")}`,
    );
  });

  it("normalizes valid addresses, stores token hashes, and requests confirmation", async () => {
    await expect(service.subscribe("  Member@Example.com ", true, "203.0.113.4"))
      .resolves.toEqual({ accepted: true });

    expect(repository.requested).toHaveLength(1);
    expect(repository.requested[0].email).toBe("member@example.com");
    expect(repository.requested[0].confirmationTokenHash).not.toContain("test-token");
    expect(repository.requested[0].unsubscribeTokenHash).not.toContain("test-token");
    expect(repository.requested[0].confirmationExpiresAt).toBe("2026-10-18T12:00:00.000Z");
    expect(sendConfirmation).toHaveBeenCalledOnce();
    expect(repository.rateKeys).toHaveLength(2);
  });

  it.each([
    "",
    "invalid",
    "missing-at.example.com",
    "person@localhost",
    `local-part-is-too-long-${"x".repeat(55)}@example.com`,
  ])("rejects invalid address %j", async (email) => {
    await expect(service.subscribe(email, true, "203.0.113.4"))
      .rejects.toBeInstanceOf(NewsletterInputError);
    expect(repository.requested).toHaveLength(0);
    expect(sendConfirmation).not.toHaveBeenCalled();
  });

  it("requires explicit consent", async () => {
    await expect(service.subscribe("member@example.com", false, "203.0.113.4"))
      .rejects.toBeInstanceOf(NewsletterInputError);
    expect(repository.requested).toHaveLength(0);
  });

  it("does not resend for an existing pending or confirmed address", async () => {
    repository.state = "no_email";

    await expect(service.subscribe("member@example.com", true, "203.0.113.4"))
      .resolves.toEqual({ accepted: true });
    expect(sendConfirmation).not.toHaveBeenCalled();
  });

  it("returns a generic rate-limit error before storing a subscription", async () => {
    repository.rateAllowed = false;

    await expect(service.subscribe("member@example.com", true, "203.0.113.4"))
      .rejects.toBeInstanceOf(NewsletterRateLimitError);
    expect(repository.requested).toHaveLength(0);
    expect(sendConfirmation).not.toHaveBeenCalled();
  });

  it("confirms only correctly formed one-time tokens through the repository", async () => {
    await expect(service.confirm("invalid")).resolves.toBe("invalid");
    await expect(service.confirm("A".repeat(43))).resolves.toBe("confirmed");
    expect(repository.tokenResult).toBe("confirmed");
  });

  it("makes repeated unsubscribe outcomes safe and idempotent", async () => {
    repository.tokenResult = "already_unsubscribed";
    await expect(service.unsubscribe("A".repeat(43))).resolves.toBe("already_unsubscribed");
  });

  it("clears the pending token and reports failed confirmation delivery", async () => {
    sendConfirmation.mockRejectedValueOnce(new Error("provider failure"));

    await expect(service.subscribe("member@example.com", true, "203.0.113.4"))
      .rejects.toBeInstanceOf(NewsletterDeliveryError);
    expect(repository.clearedTokens).toEqual([
      repository.requested[0].confirmationTokenHash,
    ]);
  });
});