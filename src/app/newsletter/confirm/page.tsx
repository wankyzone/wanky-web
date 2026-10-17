import type { Metadata } from "next";
import NewsletterAction from "@/components/NewsletterAction";

export const metadata: Metadata = {
  title: "Confirm newsletter subscription — Wanky Technologies",
  robots: { index: false, follow: false },
};

export default function NewsletterConfirmPage() {
  return <NewsletterAction kind="confirm" />;
}