
import "server-only";
import { Resend } from "resend";
import {
  createConfirmationEmailTemplate,
  createWelcomeEmailTemplate,
} from "./email-templates";
import type { NewsletterMailer } from "./contracts";

const FROM = "Wanky Technologies <newsletter@news.wankysoftware.com>";

export class ResendNewsletterMailer implements NewsletterMailer {
  private readonly resend: Resend;

  constructor(
    apiKey: string,
    private readonly siteUrl: string,
  ) {
    this.resend = new Resend(apiKey);
  }

  async sendConfirmation(input: {
    email: string;
    confirmationToken: string;
    unsubscribeToken: string;
    idempotencyKey: string;
  }): Promise<void> {
    const confirmationUrl =
      `${this.siteUrl}/newsletter/confirm#${new URLSearchParams({
        token: input.confirmationToken,
        unsubscribeToken: input.unsubscribeToken,
      }).toString()}`;
    const template = createConfirmationEmailTemplate({
      confirmationUrl,
      websiteUrl: this.siteUrl,
    });

    const { error } = await this.resend.emails.send(
      {
        from: FROM,
        to: input.email,
        subject: template.subject,
        html: template.html,
        text: template.text,
      },
      { idempotencyKey: input.idempotencyKey },
    );

    if (error) {
      throw new Error("Confirmation delivery failed.");
    }
  }

  async sendWelcome(input: {
    email: string;
    unsubscribeToken: string;
    idempotencyKey: string;
  }): Promise<void> {
    const unsubscribeUrl =
      `${this.siteUrl}/newsletter/unsubscribe#${input.unsubscribeToken}`;
    const template = createWelcomeEmailTemplate({
      unsubscribeUrl,
      websiteUrl: this.siteUrl,
    });

    const { error } = await this.resend.emails.send(
      {
        from: FROM,
        to: input.email,
        subject: template.subject,
        html: template.html,
        text: template.text,
      },
      { idempotencyKey: input.idempotencyKey },
    );

    if (error) {
      throw new Error("Welcome delivery failed.");
    }
  }
}
