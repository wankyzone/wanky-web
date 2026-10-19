import type { ErsValidationIssue } from "./ers-validation";

export type ErsFormSubmissionResult =
  | { status: "accepted" }
  | { status: "invalid"; issues: ErsValidationIssue[] }
  | { status: "rate_limited" }
  | { status: "error" };

export async function submitErsInterest(
  payload: unknown,
  fetchRequest: typeof fetch = fetch,
): Promise<ErsFormSubmissionResult> {
  try {
    const response = await fetchRequest("/api/product-interest/ers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    let body: unknown;
    try {
      body = await response.json();
    } catch {
      body = null;
    }

    if (response.status === 202 && hasStatus(body, "accepted")) {
      return { status: "accepted" };
    }

    if (
      response.status === 400 &&
      hasStatus(body, "invalid_submission")
    ) {
      return { status: "invalid", issues: readValidationIssues(body) };
    }

    if (response.status === 429) {
      return { status: "rate_limited" };
    }

    return { status: "error" };
  } catch {
    return { status: "error" };
  }
}

function hasStatus(
  value: unknown,
  status: string,
): value is { status: string; issues?: unknown } {
  return (
    typeof value === "object" &&
    value !== null &&
    "status" in value &&
    value.status === status
  );
}

function readValidationIssues(value: unknown): ErsValidationIssue[] {
  if (typeof value !== "object" || value === null || !("issues" in value)) {
    return [];
  }

  const issues = value.issues;
  if (!Array.isArray(issues)) return [];

  return issues.filter(
    (issue): issue is ErsValidationIssue =>
      typeof issue === "object" &&
      issue !== null &&
      "path" in issue &&
      typeof issue.path === "string" &&
      "code" in issue &&
      typeof issue.code === "string",
  );
}
