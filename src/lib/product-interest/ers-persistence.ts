import {
  ERS_CONTACT_CONSENT_TEXT,
  type ErsInterestType,
} from "./ers-config";
import type { ErsInterestSubmission } from "./ers-validation";

export type ErsInterestPersistencePayload = {
  product_id: "ers";
  form_version: "ers-v1";
  name: string;
  email: string;
  interest_type: ErsInterestType;
  answers: ErsInterestSubmission["answers"];
  contact_consent: true;
  contact_consent_text: string;
};

export function toErsInterestPersistencePayload(
  submission: ErsInterestSubmission,
): ErsInterestPersistencePayload {
  return {
    product_id: submission.productId,
    form_version: submission.formVersion,
    name: submission.contact.name,
    email: submission.contact.email,
    interest_type: submission.interestType,
    answers: submission.answers,
    contact_consent: submission.consent,
    contact_consent_text: ERS_CONTACT_CONSENT_TEXT,
  };
}
