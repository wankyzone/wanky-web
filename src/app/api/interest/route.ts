import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const allowedProducts = new Set(["ers", "wanky-cloud", "wanky-ai", "wanky-protect", "software-services", "partnership"]);
const allowedGoals = new Set(["Get product updates", "Join an early-access or feedback group", "Discuss a project or service", "Explore a partnership", "Ask a question", "Other"]);
const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get("origin");
    const configuredSiteUrl = process.env.WANKY_NEWSLETTER_SITE_URL;
    if (origin && configuredSiteUrl) {
      try {
        if (new URL(origin).origin !== new URL(configuredSiteUrl).origin) {
          return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
        }
      } catch {
        return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
      }
    }
    const contentLength = Number(request.headers.get("content-length") || "0");
    if (contentLength > 12_000) {
      return NextResponse.json({ error: "Your submission is too large." }, { status: 413 });
    }
    const body = await request.json();
    // Quietly accept honeypot submissions without storing or emailing them.
    if (clean(body.website, 200)) return NextResponse.json({ ok: true });

    const product = clean(body.product, 60);
    const name = clean(body.name, 120);
    const email = clean(body.email, 254).toLowerCase();
    const organization = clean(body.organization, 180);
    const role = clean(body.role, 120);
    const goal = clean(body.goal, 100);
    const details = clean(body.details, 3000);
    const timeline = clean(body.timeline, 80);
    const budget = clean(body.budget, 80);
    const updatesConsent = body.updatesConsent === true;

    if (!allowedProducts.has(product) || !allowedGoals.has(goal) || name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please check your product choice, name, goal, and email address." }, { status: 400 });
    }

    const supabaseUrl = process.env.WANKY_NEWSLETTER_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.WANKY_NEWSLETTER_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceKey) {
      console.error("Interest form is missing Supabase server configuration.");
      return NextResponse.json({ error: "The interest form is temporarily unavailable. Please try again later." }, { status: 503 });
    }

    const saved = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/wanky_interest_submissions`, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        product, name, email, organization: organization || null, role: role || null,
        goal, details: details || null, timeline: timeline || null, budget: budget || null,
        updates_consent: updatesConsent,
        source_path: clean(body.sourcePath, 200) || "/interest",
        status: "new",
      }),
      cache: "no-store",
    });
    if (!saved.ok) {
      console.error("Interest submission persistence failed:", saved.status, (await saved.text()).slice(0, 500));
      return NextResponse.json({ error: "We couldn't save your inquiry just now. Please try again later." }, { status: 503 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.WANKY_INTEREST_NOTIFY_EMAIL || "wankyzone@gmail.com";
    // Reuse the verified sender already used by Wanky newsletter delivery.
    const fromEmail = process.env.WANKY_TRANSACTIONAL_FROM_EMAIL || "Wanky Technologies <newsletter@news.wankysoftware.com>";
    let notificationSent = false;

    if (resendKey && fromEmail) {
      const summary = [
        `Product: ${product}`, `Name: ${name}`, `Email: ${email}`,
        `Organization: ${organization || "Not provided"}`, `Role: ${role || "Not provided"}`,
        `Goal: ${goal}`, `Timeline: ${timeline || "Not provided"}`,
        `Budget: ${budget || "Not provided"}`, `Updates consent: ${updatesConsent ? "Yes" : "No"}`,
        "", "Details:", details || "Not provided",
      ].join("\n");
      try {
        const mail = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: fromEmail,
            to: [notifyEmail],
            reply_to: email,
            subject: `New Wanky interest: ${product} — ${name}`,
            text: summary,
          }),
          cache: "no-store",
        });
        notificationSent = mail.ok;
        if (!mail.ok) console.error("Interest notification email failed:", mail.status, (await mail.text()).slice(0, 500));
      } catch (mailError) {
        console.error("Interest notification email request failed:", mailError);
      }
    } else {
      console.warn("Interest saved, but notification email is not configured. Set RESEND_API_KEY and WANKY_TRANSACTIONAL_FROM_EMAIL.");
    }

    return NextResponse.json({ ok: true, notificationSent, message: notificationSent ? "Your inquiry was saved and the team was notified." : "Your inquiry was saved. Email notification is temporarily unavailable; the team can still review it in the database." });
  } catch (error) {
    console.error("Interest endpoint error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
