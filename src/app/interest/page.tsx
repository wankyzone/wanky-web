import type { Metadata } from "next";
import InterestOnboarding from "@/components/InterestOnboarding";

export const metadata: Metadata = {
  title: "Get Started — Wanky Technologies",
  description:
    "Tell Wanky what you are interested in. Choose a product or collaboration path and share what you need through a guided onboarding flow.",
};

export default function InterestPage() {
  return <InterestOnboarding />;
}
