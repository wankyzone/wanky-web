export type NewsletterEmailTemplate = {
  subject: string;
  preview: string;
  html: string;
  text: string;
};

export type ConfirmationEmailInput = {
  confirmationUrl: string;
  websiteUrl: string;
};

export type WelcomeEmailInput = {
  unsubscribeUrl: string;
  websiteUrl: string;
};

const CONFIRMATION_PREVIEW =
  "One quick step to receive product news and engineering updates from Wanky.";
const WELCOME_PREVIEW = "You're subscribed. Here's what you can expect from Wanky.";
const SIGNATURE = "The Wanky Technologies Team";
const PINK = "#FF4D94";

export function createConfirmationEmailTemplate({
  confirmationUrl,
  websiteUrl,
}: ConfirmationEmailInput): NewsletterEmailTemplate {
  const confirmHref = safeHttpsUrl(confirmationUrl);
  const websiteHref = safeHttpsUrl(websiteUrl);

  return {
    subject: "Confirm your subscription to Wanky Technologies",
    preview: CONFIRMATION_PREVIEW,
    html: renderEmail({
      preview: CONFIRMATION_PREVIEW,
      title: "Confirm your email address",
      paragraphs: [
        "Thanks for your interest in Wanky Technologies.",
        "Confirm your email address to receive product news and engineering updates from Wanky.",
      ],
      button: { label: "Confirm my email address", href: confirmHref },
      footerLinks: [{ label: "Wanky Technologies website", href: websiteHref }],
    }),
    text: [
      "Wanky Technologies",
      "",
      CONFIRMATION_PREVIEW,
      "",
      "Thanks for your interest in Wanky Technologies.",
      "Confirm your email address to receive product news and engineering updates from Wanky.",
      "",
      `Confirm my email address: ${confirmHref}`,
      `Wanky Technologies website: ${websiteHref}`,
      "",
      SIGNATURE,
    ].join("\n"),
  };
}

export function createWelcomeEmailTemplate({
  unsubscribeUrl,
  websiteUrl,
}: WelcomeEmailInput): NewsletterEmailTemplate {
  const unsubscribeHref = safeHttpsUrl(unsubscribeUrl);
  const websiteHref = safeHttpsUrl(websiteUrl);

  return {
    subject: "Welcome to Wanky Technologies",
    preview: WELCOME_PREVIEW,
    html: renderEmail({
      preview: WELCOME_PREVIEW,
      title: "Welcome to Wanky Technologies",
      paragraphs: [
        "You're subscribed. Thank you for joining us.",
        "You can expect product updates, engineering notes, AI and infrastructure insights, and meaningful Wanky company news.",
      ],
      button: { label: "Explore Wanky", href: websiteHref },
      footerLinks: [
        { label: "Wanky Technologies website", href: websiteHref },
        { label: "Unsubscribe from Wanky updates", href: unsubscribeHref },
      ],
    }),
    text: [
      "Wanky Technologies",
      "",
      WELCOME_PREVIEW,
      "",
      "You're subscribed. Thank you for joining us.",
      "You can expect product updates, engineering notes, AI and infrastructure insights, and meaningful Wanky company news.",
      "",
      `Explore Wanky: ${websiteHref}`,
      `Wanky Technologies website: ${websiteHref}`,
      `Unsubscribe from Wanky updates: ${unsubscribeHref}`,
      "",
      SIGNATURE,
    ].join("\n"),
  };
}

type RenderEmailInput = {
  preview: string;
  title: string;
  paragraphs: string[];
  button: { label: string; href: string };
  footerLinks: { label: string; href: string }[];
};

function renderEmail({
  preview,
  title,
  paragraphs,
  button,
  footerLinks,
}: RenderEmailInput): string {
  const paragraphMarkup = paragraphs
    .map(
      (paragraph) =>
        `<tr><td style="padding:0 0 16px;color:#3f3f46;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:26px">${escapeHtml(paragraph)}</td></tr>`,
    )
    .join("");
  const footerMarkup = footerLinks
    .map(
      ({ label, href }) =>
        `<a href="${href}" style="color:#18181b;text-decoration:underline">${escapeHtml(label)}</a>`,
    )
    .join("&nbsp;&nbsp;|&nbsp;&nbsp;");

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background-color:#ffffff;color:#18181b;font-family:Arial,Helvetica,sans-serif">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${escapeHtml(preview)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background-color:#ffffff">
      <tr>
        <td align="center" style="padding:40px 16px">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px">
            <tr>
              <td style="padding:0 0 24px;border-bottom:2px solid ${PINK};color:#18181b;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase">Wanky Technologies</td>
            </tr>
            <tr>
              <td style="padding:32px 0 12px;color:#18181b;font-family:Arial,Helvetica,sans-serif;font-size:28px;font-weight:bold;line-height:36px">${escapeHtml(title)}</td>
            </tr>
            ${paragraphMarkup}
            <tr>
              <td style="padding:12px 0 32px">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td bgcolor="${PINK}" style="background-color:${PINK};border-radius:4px">
                      <a href="${button.href}" style="display:inline-block;padding:15px 22px;color:#18181b;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;line-height:20px;text-decoration:none">${escapeHtml(button.label)}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 0 0;border-top:1px solid #e4e4e7;color:#52525b;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:22px">${footerMarkup}</td>
            </tr>
            <tr>
              <td style="padding:18px 0 0;color:#52525b;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:22px">${SIGNATURE}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function safeHttpsUrl(value: string): string {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new TypeError("Newsletter email links must be absolute HTTPS URLs.");
  }

  if (url.protocol !== "https:") {
    throw new TypeError("Newsletter email links must use HTTPS.");
  }

  return escapeHtml(url.toString());
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}
