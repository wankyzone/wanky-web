export type SubscriptionRequestState =
  | "confirmation_required"
  | "no_email";

export type TokenResult = "confirmed" | "unsubscribed" | "already_unsubscribed" | "invalid";

export interface NewsletterRepository {
  consumeRateLimit(keyHash: string, limit: number): Promise<boolean>;
  requestSubscription(input: {
    email: string;
    confirmationTokenHash: string;
    unsubscribeTokenHash: string;
    confirmationExpiresAt: string;
  }): Promise<SubscriptionRequestState>;
  clearFailedConfirmation(tokenHash: string): Promise<void>;
  confirmSubscription(tokenHash: string): Promise<TokenResult>;
  unsubscribe(tokenHash: string): Promise<TokenResult>;
  listConfirmedRecipients(): Promise<string[]>;
}

export interface NewsletterMailer {
  sendConfirmation(input: {
    email: string;
    confirmationToken: string;
    unsubscribeToken: string;
    idempotencyKey: string;
  }): Promise<void>;
}