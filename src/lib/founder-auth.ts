import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

const COOKIE = "wanky_founder_session";
const MAX_AGE = 60 * 60 * 12;
function secret() { return process.env.ADMIN_SESSION_SECRET || ""; }
function signature(value: string) { return createHmac("sha256", secret()).update(value).digest("hex"); }
export function createFounderSession() {
  if (!secret()) throw new Error("Founder session secret is not configured.");
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + MAX_AGE * 1000, v: 1 })).toString("base64url");
  return `${payload}.${signature(payload)}`;
}
export function hasFounderSession(request: NextRequest) {
  if (!secret()) return false;
  const token = request.cookies.get(COOKIE)?.value || "";
  const [payload, supplied] = token.split(".");
  if (!payload || !supplied) return false;
  const expected = signature(payload);
  const a = Buffer.from(supplied); const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  try { const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")); return decoded.v === 1 && typeof decoded.exp === "number" && decoded.exp > Date.now(); } catch { return false; }
}
export const founderCookieName = COOKIE;
export const founderCookieMaxAge = MAX_AGE;
