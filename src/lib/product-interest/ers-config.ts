export const ERS_FORM_VERSION = "ers-v1";

export const ERS_CONTACT_CONSENT_TEXT =
  "I agree that Wanky Technologies may use the information I provide to respond to my ERS interest request and follow up with me about it. This does not sign me up for the Wanky newsletter.";

export type ErsInterestType =
  | "errands_completed"
  | "runner_interest"
  | "business_partnership"
  | "other";

export type ErsQuestionDefinition = {
  id: string;
  label: string;
  required: boolean;
  maxLength: number;
  input: "text" | "textarea";
};

export type ErsBranchDefinition = {
  label: string;
  description: string;
  questions: readonly ErsQuestionDefinition[];
};

export type ErsContactFieldDefinition = {
  label: string;
  required: true;
  maxLength: number;
  input: "text" | "email";
  autoComplete: string;
};

export const ERS_FORM_CONFIGURATION = {
  productId: "ers",
  version: ERS_FORM_VERSION,
  consentText: ERS_CONTACT_CONSENT_TEXT,
  contact: {
    name: {
      label: "Your name",
      required: true,
      maxLength: 120,
      input: "text",
      autoComplete: "name",
    },
    email: {
      label: "Email address",
      required: true,
      maxLength: 254,
      input: "email",
      autoComplete: "email",
    },
  },
  branches: {
    errands_completed: {
      label: "Errands completed",
      description:
        "Tell us what kind of errand you are interested in having completed.",
      questions: [
        {
          id: "errandDetails",
          label: "What kind of errand are you interested in?",
          required: true,
          maxLength: 500,
          input: "textarea",
        },
        {
          id: "cityArea",
          label: "Where might you need errands?",
          required: false,
          maxLength: 100,
          input: "text",
        },
      ],
    },
    runner_interest: {
      label: "Becoming a Runner",
      description:
        "Tell us what interests you about becoming a Runner. This is not a Runner application.",
      questions: [
        {
          id: "runnerMotivation",
          label: "What interests you about becoming a Runner?",
          required: true,
          maxLength: 500,
          input: "textarea",
        },
        {
          id: "cityArea",
          label: "Where would you prefer to operate?",
          required: false,
          maxLength: 100,
          input: "text",
        },
      ],
    },
    business_partnership: {
      label: "Business partnership",
      description:
        "Tell us about your organization and the partnership you would like to explore.",
      questions: [
        {
          id: "businessType",
          label: "What kind of business or organization are you representing?",
          required: true,
          maxLength: 160,
          input: "text",
        },
        {
          id: "partnershipInterest",
          label: "What kind of partnership are you interested in exploring?",
          required: true,
          maxLength: 500,
          input: "textarea",
        },
        {
          id: "cityArea",
          label: "Where is your business or organization based?",
          required: false,
          maxLength: 100,
          input: "text",
        },
      ],
    },
    other: {
      label: "Other",
      description:
        "Tell us what else you are interested in discussing about ERS.",
      questions: [
        {
          id: "otherInterest",
          label: "What are you interested in discussing about ERS?",
          required: true,
          maxLength: 500,
          input: "textarea",
        },
        {
          id: "cityArea",
          label: "Where is this interest relevant?",
          required: false,
          maxLength: 100,
          input: "text",
        },
      ],
    },
  },
} as const satisfies {
  productId: "ers";
  version: string;
  consentText: string;
  contact: Record<"name" | "email", ErsContactFieldDefinition>;
  branches: Record<ErsInterestType, ErsBranchDefinition>;
};
