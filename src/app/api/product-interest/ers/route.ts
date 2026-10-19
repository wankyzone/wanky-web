import {
  allowLimitedRequest,
  isSameOrigin,
  jsonResponse,
  readSmallJson,
} from "../../../../lib/newsletter/http";
import { getErsInterestRuntime } from "../../../../lib/product-interest/ers-runtime";
import { validateErsInterestSubmission } from "../../../../lib/product-interest/ers-validation";

export const runtime = "nodejs";

export async function POST(request: Request): Promise<Response> {
  const ers = getErsInterestRuntime();
  if (!ers) return jsonResponse({ status: "unavailable" }, 503);

  if (!isSameOrigin(request, ers.siteUrl)) {
    return jsonResponse({ status: "origin_rejected" }, 403);
  }

  let payload: unknown | null;
  try {
    payload = await readSmallJson(request);
  } catch {
    return jsonResponse({ status: "malformed_request" }, 400);
  }

  if (payload === null) {
    return jsonResponse({ status: "malformed_request" }, 400);
  }

  const validation = validateErsInterestSubmission(payload);
  if (!validation.success) {
    return jsonResponse(
      { status: "invalid_submission", issues: validation.issues },
      400,
    );
  }

  let rateAllowed: boolean;
  try {
    rateAllowed = await allowLimitedRequest(
      request,
      ers.consumeRateLimit,
      ers.rateLimitSecret,
      5,
    );
  } catch {
    return jsonResponse({ status: "rate_limit_unavailable" }, 503);
  }

  if (!rateAllowed) {
    return jsonResponse({ status: "rate_limited" }, 429);
  }

  try {
    await ers.repository.saveSubmission(validation.data);
  } catch {
    return jsonResponse({ status: "storage_unavailable" }, 503);
  }

  return jsonResponse({ status: "accepted" }, 202);
}
