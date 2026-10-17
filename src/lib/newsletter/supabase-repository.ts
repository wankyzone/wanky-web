import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { NewsletterRepository, SubscriptionRequestState, TokenResult } from "./contracts";

export class SupabaseNewsletterRepository implements NewsletterRepository {
  private readonly client;

  constructor(url: string, serviceRoleKey: string) {
    this.client = createClient(url, serviceRoleKey, {
      db: { schema: "wanky_newsletter" },
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    });
  }

  async consumeRateLimit(keyHash: string, limit: number): Promise<boolean> {
    const { data, error } = await this.client.rpc("consume_rate_limit", {
      p_key_hash: keyHash,
      p_limit: limit,
    });

    if (error) throw new Error("Newsletter request unavailable.");
    return data === true;
  }

  async requestSubscription(input: {
    email: string;
    confirmationTokenHash: string;
    unsubscribeTokenHash: string;
    confirmationExpiresAt: string;
  }): Promise<SubscriptionRequestState> {
    const { data, error } = await this.client.rpc("request_subscription", {
      p_email: input.email,
      p_confirmation_token_hash: input.confirmationTokenHash,
      p_unsubscribe_token_hash: input.unsubscribeTokenHash,
      p_confirmation_expires_at: input.confirmationExpiresAt,
    });

    if (error) throw new Error("Newsletter request unavailable.");
    const result = Array.isArray(data) ? data[0]?.state : undefined;
    if (result !== "confirmation_required" && result !== "no_email") {
      throw new Error("Newsletter request unavailable.");
    }

    return result;
  }

  async confirmSubscription(tokenHash: string): Promise<TokenResult> {
    const { data, error } = await this.client.rpc("confirm_subscription", {
      p_confirmation_token_hash: tokenHash,
    });

    if (error) throw new Error("Newsletter confirmation unavailable.");
    return parseTokenResult(data, "confirmed");
  }

    async claimWelcomeDelivery(
    confirmationTokenHash: string,
    unsubscribeTokenHash: string,
  ): Promise<{ email: string; deliveryKey: string } | null> {
    const { data, error } = await this.client.rpc("claim_welcome_delivery", {
      p_confirmation_token_hash: confirmationTokenHash,
      p_unsubscribe_token_hash: unsubscribeTokenHash,
    });

    if (error) throw new Error("Welcome delivery claim unavailable.");

    const result = Array.isArray(data) ? data[0] : undefined;
    if (
      !result ||
      typeof result.email !== "string" ||
      typeof result.delivery_key !== "string"
    ) {
      return null;
    }

    return {
      email: result.email,
      deliveryKey: result.delivery_key,
    };
  }

  async finishWelcomeDelivery(
    confirmationTokenHash: string,
    unsubscribeTokenHash: string,
    success: boolean,
  ): Promise<boolean> {
    const { data, error } = await this.client.rpc("finish_welcome_delivery", {
      p_confirmation_token_hash: confirmationTokenHash,
      p_unsubscribe_token_hash: unsubscribeTokenHash,
      p_success: success,
    });

    if (error) throw new Error("Welcome delivery result unavailable.");
    return data === true;
  }

  async clearFailedConfirmation(tokenHash: string): Promise<void> {
    const { error } = await this.client.rpc("clear_failed_confirmation", {
      p_confirmation_token_hash: tokenHash,
    });

    if (error) throw new Error("Newsletter retry unavailable.");
  }

  async unsubscribe(tokenHash: string): Promise<TokenResult> {
    const { data, error } = await this.client.rpc("unsubscribe", {
      p_unsubscribe_token_hash: tokenHash,
    });

    if (error) throw new Error("Newsletter unsubscribe unavailable.");
    return parseTokenResult(data, "unsubscribed", "already_unsubscribed");
  }

  async listConfirmedRecipients(): Promise<string[]> {
    const recipients: string[] = [];
    let offset = 0;
    const pageSize = 500;

    while (true) {
      const { data, error, count } = await this.client
        .from("subscriptions")
        .select("email", { count: "exact" })
        .eq("status", "confirmed")
        .order("email")
        .range(offset, offset + pageSize - 1);

      if (error) throw new Error("Newsletter recipient query unavailable.");
      const page = data ?? [];
      recipients.push(...page.map(({ email }) => email));
      offset += page.length;

      if (page.length === 0 || (count !== null && offset >= count)) break;
    }

    return recipients;
  }
}

function parseTokenResult(
  data: unknown,
  success: TokenResult,
  already?: TokenResult,
): TokenResult {
  if (data === success) return success;
  if (data === "invalid") return "invalid";
  if (already && data === already) return already;
  return "invalid";
}