import { NextRequest, NextResponse } from "next/server";
import { hasFounderSession } from "@/lib/founder-auth";
import { getNewsletterRuntime } from "@/lib/newsletter/runtime";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!hasFounderSession(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  const newsletter = getNewsletterRuntime();
  if (!newsletter) {
    return NextResponse.json({
      enabled: false,
      confirmedRecipients: null,
      message: "Newsletter operations are disabled or not configured in this environment.",
    }, { headers: { "Cache-Control": "no-store" } });
  }

  try {
    const recipients = await newsletter.service.getConfirmedRecipients();
    return NextResponse.json({
      enabled: true,
      confirmedRecipients: recipients.length,
      message: "Count includes confirmed newsletter subscribers only. Recipient addresses are never returned to the dashboard.",
    }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Newsletter audience is temporarily unavailable." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
