import { getNewsletterRuntime } from "@/lib/newsletter/runtime";
import { allowLimitedRequest, isSameOrigin, jsonResponse, readSmallJson } from "@/lib/newsletter/http";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const newsletter = getNewsletterRuntime();
  if (!newsletter) return jsonResponse({ status: "unavailable" }, 503);
  if (!isSameOrigin(request, newsletter.siteUrl)) {
    return jsonResponse({ status: "invalid_request" }, 403);
  }

  const allowed = await allowLimitedRequest(
    request,
    newsletter.repository.consumeRateLimit.bind(newsletter.repository),
    newsletter.rateLimitSecret,
    30,
  );
  if (!allowed) return jsonResponse({ status: "rate_limited" }, 429);

  const payload = await readSmallJson(request);
  if (!payload || typeof payload !== "object") {
    return jsonResponse({ status: "invalid_request" }, 400);
  }

  try {
    const token = (payload as Record<string, unknown>).token;
    const result = await newsletter.service.confirm(token);
    if (result === "confirmed") return jsonResponse({ status: "confirmed" }, 200);
    return jsonResponse({ status: "invalid_or_expired" }, 400);
  } catch {
    return jsonResponse({ status: "unavailable" }, 503);
  }
}