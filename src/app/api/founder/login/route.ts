import { NextRequest, NextResponse } from "next/server";
import {
  allowFounderLoginAttempt,
  hasValidFounderOrigin,
  readFounderJson,
} from "@/lib/founder-request";
import {
  createFounderSession,
  founderCookieMaxAge,
  founderCookieName,
} from "@/lib/founder-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json({ error: "Founder access is not configured." }, { status: 503 });
  }
  if (!hasValidFounderOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const body = await readFounderJson(request);
  if (!body) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (typeof body.password !== "string" || body.password.length > 500) {
    return NextResponse.json({ error: "The password was not accepted." }, { status: 401 });
  }

  let allowed = false;
  try {
    allowed = await allowFounderLoginAttempt(request);
  } catch {
    allowed = false;
  }
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many attempts or login protection is temporarily unavailable. Try again later." },
      { status: 429 },
    );
  }

  if (body.password !== password) {
    return NextResponse.json({ error: "The password was not accepted." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set(founderCookieName, createFounderSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: founderCookieMaxAge,
  });
  return response;
}
