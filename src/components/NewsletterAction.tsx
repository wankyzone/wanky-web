"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type NewsletterActionKind = "confirm" | "unsubscribe";
type ActionState = "ready" | "submitting" | "success" | "invalid" | "error";

const copy: Record<NewsletterActionKind, {
  title: string;
  description: string;
  button: string;
  success: string;
}> = {
  confirm: {
    title: "Confirm your Wanky updates",
    description: "Confirm this email address to receive Wanky product news and engineering updates.",
    button: "Confirm subscription",
    success: "Your email is confirmed. You are subscribed to Wanky updates.",
  },
  unsubscribe: {
    title: "Unsubscribe from Wanky updates",
    description: "Use the button below to stop receiving Wanky newsletter emails.",
    button: "Unsubscribe",
    success: "You are unsubscribed. This address will not receive future Wanky newsletter editions.",
  },
};

export default function NewsletterAction({ kind }: { kind: NewsletterActionKind }) {
  const [state, setState] = useState<ActionState>("ready");

  async function handleAction() {
    const token = window.location.hash.slice(1);
    if (!token) {
      setState("invalid");
      return;
    }

    setState("submitting");
    window.history.replaceState(null, "", window.location.pathname);

    try {
      const response = await fetch(`/api/newsletter/${kind}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const result = (await response.json()) as { status?: string };

      if (
        (kind === "confirm" && result.status === "confirmed") ||
        (kind === "unsubscribe" && result.status === "unsubscribed")
      ) {
        setState("success");
      } else if (response.status >= 500 || response.status === 429) {
        setState("error");
      } else {
        setState("invalid");
      }
    } catch {
      setState("error");
    }
  }

  const content = copy[kind];

  return (
    <main className="mx-auto min-h-[55vh] max-w-3xl px-6 py-20 text-zinc-950 sm:py-28">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 transition hover:text-black"
      >
        <ArrowLeft size={16} /> Wanky Technologies
      </Link>

      <section className="mt-12 border-t border-zinc-200 pt-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D92D78]">
          Newsletter preference
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {content.title}
        </h1>
        <p className="mt-5 max-w-xl leading-7 text-zinc-600">
          {state === "success" ? content.success : content.description}
        </p>

        {state === "ready" && (
          <button
            type="button"
            onClick={handleAction}
            className="mt-8 inline-flex items-center gap-3 rounded-md bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#D92D78] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {content.button} <ArrowRight size={16} />
          </button>
        )}

        <p role="status" aria-live="polite" className="mt-5 min-h-6 text-sm text-zinc-500">
          {state === "submitting" && "Updating your preference…"}
          {state === "invalid" && "This link is invalid or expired. Request a new link or contact Wanky for help."}
          {state === "error" && "We couldn't update your preference. Please try again later."}
        </p>
      </section>
    </main>
  );
}