import type { Metadata } from "next";
import InterestOnboarding from "@/components/InterestOnboarding";

export const metadata: Metadata = {
  title: "Get Started — Wanky Technologies",
  description:
    "Tell Wanky which products, services, partnerships, investment, or career opportunities interest you through one guided onboarding flow.",
};

export default function GetStartedPage() {
  return <InterestOnboarding />;
}
