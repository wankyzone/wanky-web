import { getNewsletterRuntime } from "@/lib/newsletter/runtime";
import { getClientAddress, isSameOrigin, jsonResponse, readSmallJson } from "@/lib/newsletter/http";
import {
  NewsletterDeliveryError,
  NewsletterInputError,
  NewsletterRateLimitError,
} from "@/lib/newsletter/service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const newsletter = getNewsletterRuntime();
  if (!newsletter) return jsonResponse({ status: "unavailable" }, 503);
  if (!isSameOrigin(request, newsletter.siteUrl)) {
    return jsonResponse({ status: "invalid_request" }, 403);
  }

  const payload = await readSmallJson(request);
  if (!payload || typeof payload !== "object") {
    return jsonResponse({ status: "invalid_request" }, 400);
  }

  const form = payload as Record<string, unknown>;
  if (typeof form.company === "string" && form.company.trim()) {
    return jsonResponse({ status: "accepted" }, 202);
  }

  const address = getClientAddress(request);
  if (!address) return jsonResponse({ status: "rate_limited" }, 429);

  try {
    await newsletter.service.subscribe(form.email, form.consent, address);
    return jsonResponse({ status: "accepted" }, 202);
  } catch (error) {
    if (error instanceof NewsletterInputError) {
      return jsonResponse({ status: "invalid_input" }, 400);
    }
    if (error instanceof NewsletterRateLimitError) {
      return jsonResponse({ status: "rate_limited" }, 429);
    }
    if (error instanceof NewsletterDeliveryError) {
      return jsonResponse({ status: "delivery_unavailable" }, 503);
    }
    return jsonResponse({ status: "unavailable" }, 503);
  }
}