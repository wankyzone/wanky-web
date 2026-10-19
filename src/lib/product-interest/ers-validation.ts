import {
  ERS_FORM_CONFIGURATION,
  ERS_FORM_VERSION,
  type ErsInterestType,
  type ErsQuestionDefinition,
} from "./ers-config";

const EMAIL_PATTERN =
  /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;

const TOP_LEVEL_FIELDS = [
  "productId",
  "formVersion",
  "contact",
  "interestType",
  "answers",
  "consent",
] as const;
const CONTACT_FIELDS = ["name", "email"] as const;

type ErsAnswersByInterest = {
  errands_completed: {
    errandDetails: string;
    cityArea?: string;
  };
  runner_interest: {
    runnerMotivation: string;
    cityArea?: string;
  };
  business_partnership: {
    businessType: string;
    partnershipInterest: string;
    cityArea?: string;
  };
  other: {
    otherInterest: string;
    cityArea?: string;
  };
};

type ErsSubmissionFor<T extends ErsInterestType> = {
  productId: "ers";
  formVersion: typeof ERS_FORM_VERSION;
  contact: {
    name: string;
    email: string;
  };
  interestType: T;
  answers: ErsAnswersByInterest[T];
  consent: true;
};

export type ErsInterestSubmission = {
  [T in ErsInterestType]: ErsSubmissionFor<T>;
}[ErsInterestType];

export type ErsValidationIssueCode =
  | "invalid_object"
  | "invalid_type"
  | "unexpected_field"
  | "invalid_product"
  | "unsupported_form_version"
  | "invalid_interest_type"
  | "invalid_contact"
  | "required"
  | "invalid_email"
  | "too_long"
  | "invalid_consent";

export type ErsValidationIssue = {
  path: string;
  code: ErsValidationIssueCode;
};

export type ErsValidationResult =
  | { success: true; data: ErsInterestSubmission }
  | { success: false; issues: ErsValidationIssue[] };

type RecordValue = Record<string, unknown>;

export function validateErsInterestSubmission(
  input: unknown,
): ErsValidationResult {
  const issues: ErsValidationIssue[] = [];
  if (!isRecord(input)) {
    return { success: false, issues: [{ path: "", code: "invalid_object" }] };
  }

  addUnexpectedFieldIssue(input, TOP_LEVEL_FIELDS, "", issues);

  if (input.productId !== ERS_FORM_CONFIGURATION.productId) {
    issues.push({ path: "productId", code: "invalid_product" });
  }
  if (input.formVersion !== ERS_FORM_VERSION) {
    issues.push({ path: "formVersion", code: "unsupported_form_version" });
  }

  const contact = parseContact(input.contact, issues);
  const interestType = parseInterestType(input.interestType, issues);

  if (input.consent !== true) {
    issues.push({ path: "consent", code: "invalid_consent" });
  }

  if (interestType === undefined) {
    parseInvalidBranchAnswers(input.answers, issues);
  }

  if (issues.length > 0 || contact === undefined || interestType === undefined) {
    return { success: false, issues };
  }

  switch (interestType) {
    case "errands_completed": {
      const answers = parseBranchAnswers(
        interestType,
        input.answers,
        issues,
      );
      if (issues.length > 0 || answers === undefined) {
        return { success: false, issues };
      }
      return {
        success: true,
        data: {
          productId: "ers",
          formVersion: ERS_FORM_VERSION,
          contact,
          interestType,
          answers,
          consent: true,
        },
      };
    }
    case "runner_interest": {
      const answers = parseBranchAnswers(
        interestType,
        input.answers,
        issues,
      );
      if (issues.length > 0 || answers === undefined) {
        return { success: false, issues };
      }
      return {
        success: true,
        data: {
          productId: "ers",
          formVersion: ERS_FORM_VERSION,
          contact,
          interestType,
          answers,
          consent: true,
        },
      };
    }
    case "business_partnership": {
      const answers = parseBranchAnswers(
        interestType,
        input.answers,
        issues,
      );
      if (issues.length > 0 || answers === undefined) {
        return { success: false, issues };
      }
      return {
        success: true,
        data: {
          productId: "ers",
          formVersion: ERS_FORM_VERSION,
          contact,
          interestType,
          answers,
          consent: true,
        },
      };
    }
    case "other": {
      const answers = parseBranchAnswers(
        interestType,
        input.answers,
        issues,
      );
      if (issues.length > 0 || answers === undefined) {
        return { success: false, issues };
      }
      return {
        success: true,
        data: {
          productId: "ers",
          formVersion: ERS_FORM_VERSION,
          contact,
          interestType,
          answers,
          consent: true,
        },
      };
    }
  }
}

function parseContact(
  value: unknown,
  issues: ErsValidationIssue[],
): ErsInterestSubmission["contact"] | undefined {
  if (!isRecord(value)) {
    issues.push({ path: "contact", code: "invalid_contact" });
    return undefined;
  }

  addUnexpectedFieldIssue(value, CONTACT_FIELDS, "contact", issues);

  const name = readText(
    value.name,
    "contact.name",
    ERS_FORM_CONFIGURATION.contact.name.maxLength,
    ERS_FORM_CONFIGURATION.contact.name.required,
    issues,
  );
  const email = readEmail(
    value.email,
    ERS_FORM_CONFIGURATION.contact.email.maxLength,
    issues,
  );
  if (name === undefined || email === undefined) return undefined;
  return { name, email };
}

function parseInterestType(
  value: unknown,
  issues: ErsValidationIssue[],
): ErsInterestType | undefined {
  if (typeof value !== "string" || !isErsInterestType(value)) {
    issues.push({ path: "interestType", code: "invalid_interest_type" });
    return undefined;
  }
  return value;
}

function parseInvalidBranchAnswers(
  value: unknown,
  issues: ErsValidationIssue[],
): undefined {
  if (!isRecord(value)) {
    issues.push({ path: "answers", code: "invalid_object" });
    return undefined;
  }
  return undefined;
}

function parseBranchAnswers(
  interestType: "errands_completed",
  value: unknown,
  issues: ErsValidationIssue[],
): ErsAnswersByInterest["errands_completed"] | undefined;
function parseBranchAnswers(
  interestType: "runner_interest",
  value: unknown,
  issues: ErsValidationIssue[],
): ErsAnswersByInterest["runner_interest"] | undefined;
function parseBranchAnswers(
  interestType: "business_partnership",
  value: unknown,
  issues: ErsValidationIssue[],
): ErsAnswersByInterest["business_partnership"] | undefined;
function parseBranchAnswers(
  interestType: "other",
  value: unknown,
  issues: ErsValidationIssue[],
): ErsAnswersByInterest["other"] | undefined;
function parseBranchAnswers(
  interestType: ErsInterestType,
  value: unknown,
  issues: ErsValidationIssue[],
): ErsAnswersByInterest[ErsInterestType] | undefined;
function parseBranchAnswers(
  interestType: ErsInterestType,
  value: unknown,
  issues: ErsValidationIssue[],
):
  | ErsAnswersByInterest[ErsInterestType]
  | undefined {
  if (!isRecord(value)) {
    issues.push({ path: "answers", code: "invalid_object" });
    return undefined;
  }

  const branch = ERS_FORM_CONFIGURATION.branches[interestType];
  const startIssueCount = issues.length;
  addUnexpectedFieldIssue(
    value,
    branch.questions.map(({ id }) => id),
    "answers",
    issues,
  );

  switch (interestType) {
    case "errands_completed": {
      const errandDetails = readBranchAnswer(
        value,
        branch.questions,
        "errandDetails",
        issues,
      );
      const cityArea = readBranchAnswer(
        value,
        branch.questions,
        "cityArea",
        issues,
      );
      if (issues.length !== startIssueCount || errandDetails === undefined) {
        return undefined;
      }
      return cityArea === undefined
        ? { errandDetails }
        : { errandDetails, cityArea };
    }
    case "runner_interest": {
      const runnerMotivation = readBranchAnswer(
        value,
        branch.questions,
        "runnerMotivation",
        issues,
      );
      const cityArea = readBranchAnswer(
        value,
        branch.questions,
        "cityArea",
        issues,
      );
      if (issues.length !== startIssueCount || runnerMotivation === undefined) {
        return undefined;
      }
      return cityArea === undefined
        ? { runnerMotivation }
        : { runnerMotivation, cityArea };
    }
    case "business_partnership": {
      const businessType = readBranchAnswer(
        value,
        branch.questions,
        "businessType",
        issues,
      );
      const partnershipInterest = readBranchAnswer(
        value,
        branch.questions,
        "partnershipInterest",
        issues,
      );
      const cityArea = readBranchAnswer(
        value,
        branch.questions,
        "cityArea",
        issues,
      );
      if (
        issues.length !== startIssueCount ||
        businessType === undefined ||
        partnershipInterest === undefined
      ) {
        return undefined;
      }
      return cityArea === undefined
        ? { businessType, partnershipInterest }
        : { businessType, partnershipInterest, cityArea };
    }
    case "other": {
      const otherInterest = readBranchAnswer(
        value,
        branch.questions,
        "otherInterest",
        issues,
      );
      const cityArea = readBranchAnswer(
        value,
        branch.questions,
        "cityArea",
        issues,
      );
      if (issues.length !== startIssueCount || otherInterest === undefined) {
        return undefined;
      }
      return cityArea === undefined
        ? { otherInterest }
        : { otherInterest, cityArea };
    }
  }
}

function readBranchAnswer(
  answers: RecordValue,
  questions: readonly ErsQuestionDefinition[],
  questionId: string,
  issues: ErsValidationIssue[],
): string | undefined {
  const question = questions.find(({ id }) => id === questionId);
  if (!question) {
    throw new Error(`ERS form configuration is missing question "${questionId}".`);
  }
  return readText(
    answers[questionId],
    `answers.${questionId}`,
    question.maxLength,
    question.required,
    issues,
  );
}

function readText(
  value: unknown,
  path: string,
  maxLength: number,
  required: boolean,
  issues: ErsValidationIssue[],
): string | undefined {
  if (value === undefined) {
    if (required) issues.push({ path, code: "required" });
    return undefined;
  }
  if (typeof value !== "string") {
    issues.push({ path, code: "invalid_type" });
    return undefined;
  }
  if (value.length > maxLength) {
    issues.push({ path, code: "too_long" });
    return undefined;
  }

  const normalized = value.trim();
  if (!normalized) {
    if (required) issues.push({ path, code: "required" });
    return undefined;
  }
  return normalized;
}

function readEmail(
  value: unknown,
  maxLength: number,
  issues: ErsValidationIssue[],
): string | undefined {
  if (typeof value !== "string") {
    issues.push({ path: "contact.email", code: "invalid_email" });
    return undefined;
  }
  if (value.length > maxLength) {
    issues.push({ path: "contact.email", code: "too_long" });
    return undefined;
  }

  const email = value.trim().toLowerCase();
  const [localPart] = email.split("@");
  if (
    !EMAIL_PATTERN.test(email) ||
    !localPart ||
    localPart.length > 64
  ) {
    issues.push({ path: "contact.email", code: "invalid_email" });
    return undefined;
  }
  return email;
}

function addUnexpectedFieldIssue(
  value: RecordValue,
  allowedFields: readonly string[],
  path: string,
  issues: ErsValidationIssue[],
): void {
  if (Object.keys(value).some((field) => !allowedFields.includes(field))) {
    issues.push({
      path,
      code: "unexpected_field",
    });
  }
}

function isRecord(value: unknown): value is RecordValue {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

function isErsInterestType(value: string): value is ErsInterestType {
  return Object.prototype.hasOwnProperty.call(
    ERS_FORM_CONFIGURATION.branches,
    value,
  );
}
