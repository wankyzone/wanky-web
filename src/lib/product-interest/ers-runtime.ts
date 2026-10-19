import "server-only";
import { SupabaseNewsletterRepository } from "../newsletter/supabase-repository";
import { SupabaseErsInterestRepository } from "./supabase-repository";

export type ErsInterestRuntime = {
  siteUrl: string;
  rateLimitSecret: string;
  consumeRateLimit: (keyHash: string, limit: number) => Promise<boolean>;
  repository: Pick<SupabaseErsInterestRepository, "saveSubmission">;
};

export function getErsInterestRuntime(): ErsInterestRuntime | null {
  if (
    process.env.NODE_ENV !== "production" ||
    process.env.WANKY_ERS_INTEREST_ENABLED !== "true"
  ) {
    return null;
  }

  const supabaseUrl = process.env.WANKY_NEWSLETTER_SUPABASE_URL;
  const serviceRoleKey =
    process.env.WANKY_NEWSLETTER_SUPABASE_SERVICE_ROLE_KEY;
  const rateLimitSecret = process.env.WANKY_NEWSLETTER_TOKEN_SECRET;
  const siteUrl = process.env.WANKY_NEWSLETTER_SITE_URL;

  if (!supabaseUrl || !serviceRoleKey || !rateLimitSecret || !siteUrl) {
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

  const newsletterRepository = new SupabaseNewsletterRepository(
    parsedSupabaseUrl.origin,
    serviceRoleKey,
  );

  return {
    siteUrl: parsedSiteUrl.origin,
    rateLimitSecret,
    consumeRateLimit: (keyHash: string, limit: number) =>
      newsletterRepository.consumeRateLimit(keyHash, limit),
    repository: new SupabaseErsInterestRepository(
      parsedSupabaseUrl.origin,
      serviceRoleKey,
    ),
  };
}
