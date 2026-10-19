"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useRef,
  useState,
} from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  ERS_FORM_CONFIGURATION,
  ERS_FORM_VERSION,
  type ErsInterestType,
  type ErsQuestionDefinition,
} from "../lib/product-interest/ers-config";
import { submitErsInterest } from "../lib/product-interest/ers-form-client";
import type { ErsValidationIssue } from "../lib/product-interest/ers-validation";

type FormStatus = "idle" | "submitting" | "accepted" | "error" | "rate_limited";

const contactFields = [
  {
    id: "name",
    ...ERS_FORM_CONFIGURATION.contact.name,
  },
  {
    id: "email",
    ...ERS_FORM_CONFIGURATION.contact.email,
  },
] as const;

function fieldIssueMessage(issue: ErsValidationIssue): string {
  switch (issue.code) {
    case "required":
      return "This field is required.";
    case "invalid_email":
      return "Enter a valid email address.";
    case "too_long":
      return "Shorten this answer and try again.";
    case "invalid_consent":
      return "Please confirm the contact consent to continue.";
    default:
      return "Check this field and try again.";
  }
}

export default function ErsInterestForm({ enabled }: { enabled: boolean }) {
  const [interestType, setInterestType] =
    useState<ErsInterestType>("errands_completed");
  const [contact, setContact] = useState({ name: "", email: "" });
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [issues, setIssues] = useState<ErsValidationIssue[]>([]);
  const submitting = useRef(false);

  const branch = ERS_FORM_CONFIGURATION.branches[interestType];

  if (!enabled) {
    return (
      <div
        role="status"
        className="rounded-3xl border border-zinc-200 bg-zinc-50 p-7 text-sm leading-6 text-zinc-600 sm:p-9"
      >
        The ERS interest form is currently unavailable. You can still make an
        inquiry using the contact link below.
      </div>
    );
  }

  function issueFor(path: string) {
    const issue = issues.find((candidate) => candidate.path === path);
    return issue ? fieldIssueMessage(issue) : undefined;
  }

  function clearIssues() {
    if (issues.length > 0) setIssues([]);
    if (status === "error" || status === "rate_limited") setStatus("idle");
  }

  function updateContact(field: "name" | "email", value: string) {
    setContact((current) => ({ ...current, [field]: value }));
    clearIssues();
  }

  function updateAnswer(field: string, value: string) {
    setAnswers((current) => ({ ...current, [field]: value }));
    clearIssues();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;

    submitting.current = true;
    setStatus("submitting");
    setIssues([]);

    const submission = {
      productId: ERS_FORM_CONFIGURATION.productId,
      formVersion: ERS_FORM_VERSION,
      contact,
      interestType,
      answers: Object.fromEntries(
        branch.questions.map((question) => [
          question.id,
          answers[question.id] ?? "",
        ]),
      ),
      consent,
    };

    try {
      const result = await submitErsInterest(submission);
      if (result.status === "accepted") {
        setStatus("accepted");
        setInterestType("errands_completed");
        setContact({ name: "", email: "" });
        setAnswers({});
        setConsent(false);
        return;
      }

      if (result.status === "invalid") {
        setIssues(result.issues);
        setStatus("error");
        return;
      }

      if (result.status === "rate_limited") {
        setStatus("rate_limited");
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  if (status === "accepted") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7 sm:p-9"
      >
        <CheckCircle2 className="text-emerald-700" size={28} />
        <h3 className="mt-4 text-xl font-bold text-zinc-950">
          Thanks for sharing your interest.
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-700">
          Your ERS interest request has been received. This is not a Runner
          application or a guarantee of access.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full border border-emerald-800 px-5 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-describedby="ers-interest-status"
      className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-9"
    >
      <fieldset
        disabled={status === "submitting"}
        className="min-w-0 disabled:opacity-70"
      >
        <legend className="sr-only">ERS product interest</legend>

        <p className="mb-5 text-xs text-zinc-600">
          Fields marked <span aria-hidden="true">*</span> are required.
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          {contactFields.map((field) => {
            const error = issueFor(`contact.${field.id}`);
            const errorId = `ers-${field.id}-error`;
            return (
              <div key={field.id}>
                <label
                  htmlFor={`ers-${field.id}`}
                  className="text-sm font-semibold text-zinc-900"
                >
                  {field.label} <span aria-hidden="true">*</span>
                  <span className="sr-only"> (required)</span>
                </label>
                <input
                  id={`ers-${field.id}`}
                  name={field.id}
                  type={field.input}
                  required={field.required}
                  maxLength={field.maxLength}
                  autoComplete={field.autoComplete}
                  value={contact[field.id]}
                  onChange={(event) =>
                    updateContact(field.id, event.target.value)
                  }
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? errorId : undefined}
                  className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#D92D78] focus:ring-2 focus:ring-[#D92D78]/20"
                />
                {error && (
                  <p id={errorId} className="mt-1 text-sm text-red-700">
                    {error}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <label
            htmlFor="ers-interest-type"
            className="text-sm font-semibold text-zinc-900"
          >
            What are you interested in?{" "}
            <span aria-hidden="true">*</span>
            <span className="sr-only"> (required)</span>
          </label>
          <select
            id="ers-interest-type"
            name="interestType"
            required
            value={interestType}
            onChange={(event) => {
              setInterestType(event.target.value as ErsInterestType);
              setAnswers({});
              clearIssues();
            }}
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-[#D92D78] focus:ring-2 focus:ring-[#D92D78]/20"
          >
            {Object.entries(ERS_FORM_CONFIGURATION.branches).map(
              ([value, definition]) => (
                <option key={value} value={value}>
                  {definition.label}
                </option>
              ),
            )}
          </select>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            {branch.description}
          </p>
        </div>

        <div className="mt-5 space-y-5">
          {branch.questions.map((question) => (
            <QuestionField
              key={question.id}
              question={question}
              value={answers[question.id] ?? ""}
              error={issueFor(`answers.${question.id}`)}
              onChange={(value) => updateAnswer(question.id, value)}
            />
          ))}
        </div>

        <div className="mt-7">
          <div className="flex items-start gap-3">
            <input
              id="ers-contact-consent"
              name="consent"
              type="checkbox"
              required
              checked={consent}
              onChange={(event) => {
                setConsent(event.target.checked);
                clearIssues();
              }}
              aria-invalid={Boolean(issueFor("consent"))}
              aria-describedby={
                issueFor("consent") ? "ers-consent-error" : undefined
              }
              className="mt-1 h-4 w-4 shrink-0 accent-[#D92D78] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D92D78]"
            />
            <label
              htmlFor="ers-contact-consent"
              className="text-sm leading-6 text-zinc-700"
            >
              {ERS_FORM_CONFIGURATION.consentText}{" "}
              <span aria-hidden="true">*</span>
              <span className="sr-only"> (required)</span>
            </label>
          </div>
          {issueFor("consent") && (
            <p id="ers-consent-error" className="mt-1 text-sm text-red-700">
              {issueFor("consent")}
            </p>
          )}
        </div>
      </fieldset>

      <div aria-live="polite" aria-atomic="true">
        {status === "submitting" && (
          <p
            id="ers-interest-status"
            role="status"
            className="mt-5 text-sm text-zinc-600"
          >
            Sending your request…
          </p>
        )}
        {status === "rate_limited" && (
          <p
            id="ers-interest-status"
            role="alert"
            className="mt-5 text-sm text-red-700"
          >
            We couldn’t accept this request right now. Please wait a while and
            try again.
          </p>
        )}
        {status === "error" && (
          <div
            id="ers-interest-status"
            role="alert"
            className="mt-5 text-sm leading-6 text-red-700"
          >
            {issues.some((issue) =>
              [
                "contact.name",
                "contact.email",
                "consent",
                ...branch.questions.map(({ id }) => `answers.${id}`),
              ].includes(issue.path),
            ) ? (
              <p>
                Please review the highlighted fields and submit the form again.
              </p>
            ) : (
              <p>
                We couldn’t send your request right now. Please try again
                later.
              </p>
            )}
          </div>
        )}
        {status === "idle" && (
          <p
            id="ers-interest-status"
            role="status"
            className="mt-5 min-h-6 text-sm text-zinc-600"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#D92D78] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D92D78] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send ERS interest"}
        {status !== "submitting" && <ArrowRight size={16} />}
      </button>
    </form>
  );
}

function QuestionField({
  question,
  value,
  error,
  onChange,
}: {
  question: ErsQuestionDefinition;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const inputId = `ers-answer-${question.id}`;
  const errorId = `${inputId}-error`;
  const requiredText = question.required ? (
    <>
      {" "}
      <span aria-hidden="true">*</span>
      <span className="sr-only"> (required)</span>
    </>
  ) : (
    <span className="ml-2 text-xs font-normal text-zinc-500">(optional)</span>
  );
  const commonProps = {
    id: inputId,
    name: question.id,
    required: question.required,
    maxLength: question.maxLength,
    value,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(event.target.value),
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errorId : undefined,
    className:
      "mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#D92D78] focus:ring-2 focus:ring-[#D92D78]/20",
  };

  return (
    <div>
      <label htmlFor={inputId} className="text-sm font-semibold text-zinc-900">
        {question.label}
        {requiredText}
      </label>
      {question.input === "textarea" ? (
        <textarea {...commonProps} rows={4} />
      ) : (
        <input {...commonProps} type="text" />
      )}
      <div className="mt-1 flex justify-between gap-4 text-xs text-zinc-500">
        {error ? (
          <p id={errorId} className="text-red-700">
            {error}
          </p>
        ) : (
          <span />
        )}
        <span className="ml-auto">
          {value.length}/{question.maxLength}
        </span>
      </div>
    </div>
  );
}
