import type { NextRequest } from "next/server";

const MAX_FOUNDER_BODY_BYTES = 8_192;

export function hasValidFounderOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    const parsed = new URL(origin);
    if (parsed.origin === request.nextUrl.origin) return true;
    const configured = process.env.WANKY_NEWSLETTER_SITE_URL;
    return Boolean(configured && parsed.origin === new URL(configured).origin);
  } catch {
    return false;
  }
}

export async function readFounderJson(
  request: NextRequest,
): Promise<Record<string, unknown> | null> {
  const contentType = request.headers.get("content-type")?.split(";")[0].trim();
  if (contentType !== "application/json") return null;

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_FOUNDER_BODY_BYTES) {
    return null;
  }

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_FOUNDER_BODY_BYTES) return null;

  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    return value as Record<string, unknown>;
  } catch {
    return null;
  }
}
