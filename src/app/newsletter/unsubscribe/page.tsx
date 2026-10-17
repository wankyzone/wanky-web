import type { Metadata } from "next";
import NewsletterAction from "@/components/NewsletterAction";

export const metadata: Metadata = {
  title: "Unsubscribe from newsletter — Wanky Technologies",
  robots: { index: false, follow: false },
};

export default function NewsletterUnsubscribePage() {
  return <NewsletterAction kind="unsubscribe" />;
}