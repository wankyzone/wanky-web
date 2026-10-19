import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { ERS_CONTACT_CONSENT_TEXT } from "./ers-config";
import { toErsInterestPersistencePayload } from "./ers-persistence";
import { validateErsInterestSubmission } from "./ers-validation";

const migration = readFileSync(
  new URL(
    "../../../supabase/migrations/202610190001_ers_product_interest.sql",
    import.meta.url,
  ),
  "utf8",
)
  .replace(/\s+/g, " ")
  .toLowerCase();

const validSubmission = {
  productId: "ers",
  formVersion: "ers-v1",
  contact: {
    name: "Avery Example",
    email: "avery@example.com",
  },
  interestType: "business_partnership",
  answers: {
    businessType: "Local shop",
    partnershipInterest: "Explore a possible delivery partnership.",
    cityArea: "Abuja",
  },
  consent: true,
};

describe("ERS product-interest persistence contract", () => {
  it("maps validated submissions to only the configured persisted fields", () => {
    const validation = validateErsInterestSubmission(validSubmission);
    expect(validation.success).toBe(true);
    if (!validation.success) return;

    expect(toErsInterestPersistencePayload(validation.data)).toEqual({
      product_id: "ers",
      form_version: "ers-v1",
      name: "Avery Example",
      email: "avery@example.com",
      interest_type: "business_partnership",
      answers: {
        businessType: "Local shop",
        partnershipInterest: "Explore a possible delivery partnership.",
        cityArea: "Abuja",
      },
      contact_consent: true,
      contact_consent_text: ERS_CONTACT_CONSENT_TEXT,
    });
  });

  it("stores the payload in an isolated, service-role-only schema and stamps consent", () => {
    expect(migration).toContain(
      "create table wanky_product_interest.ers_interest_submissions",
    );
    expect(migration).toContain(
      "name = pg_catalog.btrim(name) and pg_catalog.length(name) between 1 and 120",
    );
    expect(migration).toContain(
      "contact_consent boolean not null check (contact_consent)",
    );
    expect(migration).toContain(
      "contact_consent_text text not null check ( contact_consent_text =",
    );
    expect(migration).toContain(
      "this does not sign me up for the wanky newsletter.",
    );
    expect(migration).toContain(
      "consent_at timestamptz not null default pg_catalog.statement_timestamp()",
    );
    expect(migration).toContain(
      "alter table wanky_product_interest.ers_interest_submissions enable row level security",
    );
    expect(migration).toContain(
      "revoke all on wanky_product_interest.ers_interest_submissions from public, anon, authenticated, service_role",
    );
    expect(migration).toContain(
      "grant execute on function wanky_product_interest.record_ers_interest_submission( text, text, text, text, text, jsonb, boolean, text ) to service_role",
    );
    expect(migration).toContain(
      "revoke all on function wanky_product_interest.record_ers_interest_submission( text, text, text, text, text, jsonb, boolean, text ) from public, anon, authenticated",
    );
  });
});
