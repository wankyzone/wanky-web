import { NextRequest, NextResponse } from "next/server";
import { hasFounderSession } from "@/lib/founder-auth";

export const runtime = "nodejs";
const statuses = new Set(["new", "reviewing", "contacted", "qualified", "closed", "spam"]);

function config() {
  return {
    url: process.env.WANKY_NEWSLETTER_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: process.env.WANKY_NEWSLETTER_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY,
  };
}

export async function GET(request: NextRequest) {
  if (!hasFounderSession(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { url, key } = config();
  if (!url || !key) return NextResponse.json({ error: "Database configuration is unavailable." }, { status: 503 });
  const params = new URLSearchParams({ select: "id,product,interests,name,email,organization,role,goal,details,timeline,budget,updates_consent,source_path,status,created_at,updated_at", order: "created_at.desc", limit: "200" });
  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/wanky_interest_submissions?${params}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: "no-store",
  });
  if (!response.ok) {
    console.error("Founder interests read failed:", response.status, (await response.text()).slice(0, 300));
    return NextResponse.json({ error: "Unable to load inquiries." }, { status: 502 });
  }
  const rows = await response.json();
  return NextResponse.json({ inquiries: rows });
}

export async function PATCH(request: NextRequest) {
  if (!hasFounderSession(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (origin && host) {
    try { if (new URL(origin).host !== host) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 }); }
    catch { return NextResponse.json({ error: "Invalid request origin." }, { status: 403 }); }
  }
  let body: { id?: unknown; status?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (typeof body.id !== "string" || body.id.length > 80 || typeof body.status !== "string" || !statuses.has(body.status)) {
    return NextResponse.json({ error: "A valid inquiry and status are required." }, { status: 400 });
  }
  const { url, key } = config();
  if (!url || !key) return NextResponse.json({ error: "Database configuration is unavailable." }, { status: 503 });
  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/wanky_interest_submissions?id=eq.${encodeURIComponent(body.id)}`, {
    method: "PATCH",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=representation" },
    body: JSON.stringify({ status: body.status, updated_at: new Date().toISOString() }), cache: "no-store",
  });
  if (!response.ok) {
    console.error("Founder interest update failed:", response.status, (await response.text()).slice(0, 300));
    return NextResponse.json({ error: "Unable to update inquiry." }, { status: 502 });
  }
  const rows = await response.json();
  if (!rows.length) return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
  return NextResponse.json({ inquiry: rows[0] });
}
