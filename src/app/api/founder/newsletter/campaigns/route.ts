import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { hasFounderSession } from "@/lib/founder-auth";
import { hasValidFounderOrigin, readFounderJson } from "@/lib/founder-request";

export const runtime = "nodejs";

function db() {
  const url = process.env.WANKY_NEWSLETTER_SUPABASE_URL;
  const key = process.env.WANKY_NEWSLETTER_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    db: { schema: "wanky_newsletter" },
    auth: { autoRefreshToken: false, detectSessionInUrl: false, persistSession: false },
  });
}
const fields = "id,subject,body,status,created_at,updated_at";

export async function GET(request: NextRequest) {
  if (!hasFounderSession(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401, headers: { "Cache-Control": "no-store" } });
  const client = db();
  if (!client) return NextResponse.json({ error: "Newsletter database is not configured." }, { status: 503 });
  const { data, error } = await client.from("campaign_drafts").select(fields).order("updated_at", { ascending: false }).limit(50);
  if (error) {
    console.error("Campaign draft read failed:", error.code);
    return NextResponse.json({ error: "Campaign drafts are unavailable. Confirm the campaign migration has been applied." }, { status: 503 });
  }
  return NextResponse.json({ drafts: data ?? [] }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  if (!hasFounderSession(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!hasValidFounderOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const input = await readFounderJson(request);
  if (!input || typeof input.subject !== "string" || typeof input.body !== "string") return NextResponse.json({ error: "Subject and message are required." }, { status: 400 });
  const subject = input.subject.trim();
  const body = input.body.trim();
  if (!subject || subject.length > 160 || !body || body.length > 12000) return NextResponse.json({ error: "Subject must be 1–160 characters and message must be 1–12,000 characters." }, { status: 400 });
  const client = db();
  if (!client) return NextResponse.json({ error: "Newsletter database is not configured." }, { status: 503 });
  const id = typeof input.id === "string" && /^[0-9a-f-]{36}$/i.test(input.id) ? input.id : null;
  const query = id
    ? client.from("campaign_drafts").update({ subject, body, updated_at: new Date().toISOString() }).eq("id", id).select(fields).maybeSingle()
    : client.from("campaign_drafts").insert({ subject, body, status: "draft" }).select(fields).single();
  const { data, error } = await query;
  if (error || !data) {
    console.error("Campaign draft save failed:", error?.code ?? "no-row");
    return NextResponse.json({ error: "Unable to save the draft. Confirm the campaign migration has been applied." }, { status: 503 });
  }
  return NextResponse.json({ draft: data }, { headers: { "Cache-Control": "no-store" } });
}
