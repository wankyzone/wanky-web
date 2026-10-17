import "server-only";
import { Resend } from "resend";
import type { NewsletterMailer } from "./contracts";

const FROM = "Wanky Technologies <newsletter@news.wankysoftware.com>";
const SOCIAL_LINKS = [
  { label: "Website", href: "https://wanky-web.vercel.app" },
  { label: "X", href: "https://x.com/Wanky328178" },
  { label: "Threads", href: "https://threads.com/@founder.wanky" },
  { label: "Facebook", href: "https://facebook.com/isaacessoh.dev" },
  { label: "Instagram", href: "https://instagram.com/founder.wanky" },
  { label: "GitHub", href: "https://github.com/wankyzone" },
];

export class ResendNewsletterMailer implements NewsletterMailer {
  private readonly resend: Resend;

  constructor(apiKey: string, private readonly siteUrl: string) {
    this.resend = new Resend(apiKey);
  }

  async sendConfirmation(input: {
    email: string;
    confirmationToken: string;
    unsubscribeToken: string;
    idempotencyKey: string;
  }): Promise<void> {
    const confirmationUrl = `${this.siteUrl}/newsletter/confirm#${input.confirmationToken}`;
    const unsubscribeUrl = `${this.siteUrl}/newsletter/unsubscribe#${input.unsubscribeToken}`;
    const socialLinks = SOCIAL_LINKS.map(
      ({ label, href }) => `<a href="${href}" style="color:#d92d78;margin-right:12px">${label}</a>`,
    ).join("");

    const { error } = await this.resend.emails.send(
      {
        from: FROM,
        to: input.email,
        subject: "Confirm your Wanky updates subscription",
        html: confirmationEmailHtml(confirmationUrl, unsubscribeUrl, socialLinks),
        text: [
          "Confirm your subscription to Wanky product news and engineering updates.",
          "",
          `Confirm: ${confirmationUrl}`,
          `Unsubscribe: ${unsubscribeUrl}`,
          "",
          `Wanky Technologies | ${SOCIAL_LINKS.map(({ label, href }) => `${label}: ${href}`).join(" | ")}`,
        ].join("\n"),
      },
      { idempotencyKey: input.idempotencyKey },
    );

    if (error) throw new Error("Confirmation delivery failed.");
  }
}

function confirmationEmailHtml(
  confirmationUrl: string,
  unsubscribeUrl: string,
  socialLinks: string,
) {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f8f8fa;color:#18181b;font-family:Arial,sans-serif">
    <main style="max-width:560px;margin:32px auto;padding:32px;background:#fff;border:1px solid #e4e4e7;border-radius:8px">
      <p style="margin:0;color:#d92d78;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase">Wanky Technologies</p>
      <h1 style="margin:24px 0 12px;font-size:28px">Confirm your email</h1>
      <p style="line-height:1.6;color:#52525b">Confirm your address to receive product news, engineering notes, and updates from Wanky.</p>
      <p style="margin:28px 0"><a href="${confirmationUrl}" style="display:inline-block;padding:14px 22px;background:#ff4d94;color:#111;text-decoration:none;font-weight:bold;border-radius:6px">Confirm subscription</a></p>
      <p style="font-size:12px;line-height:1.6;color:#71717a">If you did not request these updates, you can <a href="${unsubscribeUrl}" style="color:#d92d78">unsubscribe here</a>. This link does not confirm your subscription.</p>
      <hr style="margin:28px 0;border:0;border-top:1px solid #e4e4e7" />
      <p style="font-size:12px;color:#71717a">${socialLinks}</p>
    </main>
  </body>
</html>`;
}