import { describe, expect, it } from "vitest";
import {
  ERS_CONTACT_CONSENT_TEXT,
  ERS_FORM_CONFIGURATION,
} from "./ers-config";
import { validateErsInterestSubmission } from "./ers-validation";

const baseSubmission = {
  productId: "ers",
  formVersion: "ers-v1",
  contact: {
    name: "Avery Example",
    email: "avery@example.com",
  },
  interestType: "errands_completed",
  answers: {
    errandDetails: "I would like to learn about errands.",
  },
  consent: true,
};

function expectInvalid(
  submission: unknown,
  expectedPath: string,
  expectedCode: string,
) {
  const result = validateErsInterestSubmission(submission);
  expect(result.success).toBe(false);
  if (!result.success) {
    expect(result.issues).toContainEqual({
      path: expectedPath,
      code: expectedCode,
    });
  }
}

describe("ERS interest form configuration", () => {
  it("defines exactly the four approved interest branches", () => {
    expect(Object.keys(ERS_FORM_CONFIGURATION.branches)).toEqual([
      "errands_completed",
      "runner_interest",
      "business_partnership",
      "other",
    ]);
  });

  it("uses the approved contact consent wording", () => {
    expect(ERS_FORM_CONFIGURATION.consentText).toBe(
      "I agree that Wanky Technologies may use the information I provide to respond to my ERS interest request and follow up with me about it. This does not sign me up for the Wanky newsletter.",
    );
    expect(ERS_CONTACT_CONSENT_TEXT).toBe(ERS_FORM_CONFIGURATION.consentText);
  });
});

describe("validateErsInterestSubmission", () => {
  it.each([
    {
      name: "errands completed",
      interestType: "errands_completed",
      answers: { errandDetails: " Pick up a parcel. ", cityArea: " Lagos " },
      expectedAnswers: {
        errandDetails: "Pick up a parcel.",
        cityArea: "Lagos",
      },
    },
    {
      name: "Runner interest",
      interestType: "runner_interest",
      answers: { runnerMotivation: " I enjoy helping people. " },
      expectedAnswers: {
        runnerMotivation: "I enjoy helping people.",
      },
    },
    {
      name: "business partnership",
      interestType: "business_partnership",
      answers: {
        businessType: " Local shop ",
        partnershipInterest: " Explore a possible delivery partnership. ",
        cityArea: " Abuja ",
      },
      expectedAnswers: {
        businessType: "Local shop",
        partnershipInterest: "Explore a possible delivery partnership.",
        cityArea: "Abuja",
      },
    },
    {
      name: "other",
      interestType: "other",
      answers: { otherInterest: " I have another ERS question. " },
      expectedAnswers: {
        otherInterest: "I have another ERS question.",
      },
    },
  ])("accepts and normalizes $name submissions", ({ interestType, answers, expectedAnswers }) => {
    const result = validateErsInterestSubmission({
      ...baseSubmission,
      contact: { name: " Avery Example ", email: " Avery@Example.com " },
      interestType,
      answers,
    });

    expect(result).toEqual({
      success: true,
      data: {
        ...baseSubmission,
        contact: { name: "Avery Example", email: "avery@example.com" },
        interestType,
        answers: expectedAnswers,
      },
    });
  });

  it("accepts omission of optional city or area", () => {
    expect(
      validateErsInterestSubmission(baseSubmission).success,
    ).toBe(true);
  });

  it("normalizes a blank optional city or area to an omitted answer", () => {
    const result = validateErsInterestSubmission({
      ...baseSubmission,
      answers: { errandDetails: "An errand.", cityArea: "   " },
    });

    expect(result).toEqual({
      success: true,
      data: {
        ...baseSubmission,
        answers: { errandDetails: "An errand." },
      },
    });
  });

  it("rejects non-object submissions", () => {
    expectInvalid(null, "", "invalid_object");
    expectInvalid([], "", "invalid_object");
  });

  it("rejects unknown products and unsupported form versions", () => {
    expectInvalid(
      { ...baseSubmission, productId: "wanky-cloud" },
      "productId",
      "invalid_product",
    );
    expectInvalid(
      { ...baseSubmission, formVersion: "ers-v2" },
      "formVersion",
      "unsupported_form_version",
    );
  });

  it("rejects unknown interest options", () => {
    expectInvalid(
      { ...baseSubmission, interestType: "runner_application" },
      "interestType",
      "invalid_interest_type",
    );
  });

  it.each([
    {
      interestType: "errands_completed",
      answers: {},
      path: "answers.errandDetails",
    },
    {
      interestType: "runner_interest",
      answers: {},
      path: "answers.runnerMotivation",
    },
    {
      interestType: "business_partnership",
      answers: { partnershipInterest: "Explore a partnership." },
      path: "answers.businessType",
    },
    {
      interestType: "business_partnership",
      answers: { businessType: "A shop" },
      path: "answers.partnershipInterest",
    },
    {
      interestType: "other",
      answers: {},
      path: "answers.otherInterest",
    },
  ])("requires branch-specific answer $path", ({ interestType, answers, path }) => {
    expectInvalid(
      { ...baseSubmission, interestType, answers },
      path,
      "required",
    );
  });

  it("rejects a question from another branch", () => {
    expectInvalid(
      {
        ...baseSubmission,
        answers: {
          errandDetails: "I need an errand.",
          runnerMotivation: "I want to become a Runner.",
        },
      },
      "answers",
      "unexpected_field",
    );
  });

  it("rejects unknown question IDs and unexpected schema fields", () => {
    expectInvalid(
      {
        ...baseSubmission,
        answers: { errandDetails: "An errand.", unknownQuestion: "value" },
      },
      "answers",
      "unexpected_field",
    );
    expectInvalid(
      { ...baseSubmission, arbitrarySchema: {} },
      "",
      "unexpected_field",
    );
    expectInvalid(
      {
        ...baseSubmission,
        contact: { ...baseSubmission.contact, phone: "123" },
      },
      "contact",
      "unexpected_field",
    );
  });

  it("rejects missing or invalid contact details and consent", () => {
    expectInvalid(
      { ...baseSubmission, contact: { name: "", email: "bad" } },
      "contact.name",
      "required",
    );
    expectInvalid(
      { ...baseSubmission, contact: { name: "Avery", email: "bad" } },
      "contact.email",
      "invalid_email",
    );
    expectInvalid(
      { ...baseSubmission, consent: false },
      "consent",
      "invalid_consent",
    );
  });

  it("rejects oversized contact and answer fields", () => {
    expectInvalid(
      {
        ...baseSubmission,
        contact: { name: "N".repeat(121), email: "avery@example.com" },
      },
      "contact.name",
      "too_long",
    );
    expectInvalid(
      {
        ...baseSubmission,
        answers: { errandDetails: "x".repeat(501) },
      },
      "answers.errandDetails",
      "too_long",
    );
    expectInvalid(
      {
        ...baseSubmission,
        interestType: "business_partnership",
        answers: {
          businessType: "x".repeat(161),
          partnershipInterest: "Explore a partnership.",
        },
      },
      "answers.businessType",
      "too_long",
    );
    expectInvalid(
      {
        ...baseSubmission,
        answers: { errandDetails: "An errand.", cityArea: "x".repeat(101) },
      },
      "answers.cityArea",
      "too_long",
    );
    expectInvalid(
      {
        ...baseSubmission,
        contact: { name: "Avery", email: `${"a".repeat(245)}@example.com` },
      },
      "contact.email",
      "too_long",
    );
  });

  it("rejects non-string optional answers instead of silently dropping them", () => {
    expectInvalid(
      {
        ...baseSubmission,
        answers: { errandDetails: "An errand.", cityArea: 123 },
      },
      "answers.cityArea",
      "invalid_type",
    );
  });
});
