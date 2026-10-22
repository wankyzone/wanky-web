import { createHmac } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
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

export async function allowFounderLoginAttempt(request: NextRequest): Promise<boolean> {
  const address = request.headers.get("x-real-ip")?.trim()
    || request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim();
  const url = process.env.WANKY_NEWSLETTER_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.WANKY_NEWSLETTER_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  const secret = process.env.WANKY_NEWSLETTER_TOKEN_SECRET;
  if (!address || address.length > 64 || !url || !key || !secret) return false;

  const hash = createHmac("sha256", secret).update(`ip:${address}`).digest("hex");
  const client = createClient(url, key, {
    db: { schema: "wanky_newsletter" },
    auth: { autoRefreshToken: false, detectSessionInUrl: false, persistSession: false },
  });
  const { data, error } = await client.rpc("consume_rate_limit", {
    p_key_hash: hash,
    p_limit: 5,
  });
  return !error && data === true;
}
