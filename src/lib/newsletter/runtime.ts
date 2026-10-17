import "server-only";
import { NewsletterService } from "./service";
import { ResendNewsletterMailer } from "./resend-mailer";
import { SupabaseNewsletterRepository } from "./supabase-repository";

export type NewsletterRuntime = {
  service: NewsletterService;
  repository: SupabaseNewsletterRepository;
  siteUrl: string;
  rateLimitSecret: string;
};

export function getNewsletterRuntime(): NewsletterRuntime | null {
  if (
    process.env.NODE_ENV !== "production" ||
    process.env.WANKY_NEWSLETTER_ENABLED !== "true"
  ) {
    return null;
  }

  const supabaseUrl = process.env.WANKY_NEWSLETTER_SUPABASE_URL;
  const serviceRoleKey = process.env.WANKY_NEWSLETTER_SUPABASE_SERVICE_ROLE_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;
  const rateLimitSecret = process.env.WANKY_NEWSLETTER_TOKEN_SECRET;
  const siteUrl = process.env.WANKY_NEWSLETTER_SITE_URL;

  if (!supabaseUrl || !serviceRoleKey || !resendApiKey || !rateLimitSecret || !siteUrl) {
    return null;
  }

  let parsedSiteUrl: URL;
  let parsedSupabaseUrl: URL;

  try {
    parsedSiteUrl = new URL(siteUrl);
    parsedSupabaseUrl = new URL(supabaseUrl);
  } catch {
    return null;
  }

  if (
    parsedSiteUrl.protocol !== "https:" ||
    parsedSupabaseUrl.protocol !== "https:" ||
    parsedSiteUrl.pathname !== "/" ||
    parsedSiteUrl.search ||
    parsedSiteUrl.hash
  ) {
    return null;
  }

  const repository = new SupabaseNewsletterRepository(
    parsedSupabaseUrl.origin,
    serviceRoleKey,
  );
  const mailer = new ResendNewsletterMailer(resendApiKey, parsedSiteUrl.origin);

  return {
    service: new NewsletterService(
      repository,
      mailer,
      parsedSiteUrl.origin,
      rateLimitSecret,
    ),
    repository,
    siteUrl: parsedSiteUrl.origin,
    rateLimitSecret,
  };
}