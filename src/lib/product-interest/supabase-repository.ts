import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { ErsInterestSubmission } from "./ers-validation";
import { toErsInterestPersistencePayload } from "./ers-persistence";

export class SupabaseErsInterestRepository {
  private readonly client;

  constructor(url: string, serviceRoleKey: string) {
    this.client = createClient(url, serviceRoleKey, {
      db: { schema: "wanky_product_interest" },
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    });
  }

  async saveSubmission(submission: ErsInterestSubmission): Promise<void> {
    const payload = toErsInterestPersistencePayload(submission);
    const { data, error } = await this.client.rpc(
      "record_ers_interest_submission",
      {
        p_product_id: payload.product_id,
        p_form_version: payload.form_version,
        p_name: payload.name,
        p_email: payload.email,
        p_interest_type: payload.interest_type,
        p_answers: payload.answers,
        p_contact_consent: payload.contact_consent,
        p_contact_consent_text: payload.contact_consent_text,
      },
    );

    if (error || !Number.isSafeInteger(data) || Number(data) < 1) {
      throw new Error("ERS interest submission could not be stored.");
    }
  }
}
