"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";

type SignupState = "idle" | "submitting" | "accepted" | "invalid" | "error";

const statusCopy: Record<Exclude<SignupState, "idle" | "submitting">, string> = {
  accepted:
    "If this address can be subscribed, we'll send a confirmation email. Check your inbox to confirm.",
  invalid: "Enter a valid email address and provide consent to receive updates.",
  error: "We couldn't process the request right now. Please try again later.",
};

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState("");
  const [state, setState] = useState<SignupState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent, company }),
      });
      const result = (await response.json()) as { status?: string };

      if (response.status === 202 && result.status === "accepted") {
        setState("accepted");
        setEmail("");
        setConsent(false);
        return;
      }

      setState(result.status === "invalid_input" ? "invalid" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <section className="border-b border-white/10 bg-black text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:gap-12">
        <div className="flex items-start gap-4">
          <Mail size={29} strokeWidth={1.5} className="mt-1 shrink-0 text-zinc-400" />
          <div>
            <h2 className="text-lg font-bold sm:text-xl">
              Get updates from Wanky
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-zinc-400">
              Product news, engineering notes, and meaningful updates from
              across the Wanky ecosystem.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl"
          aria-describedby="wanky-newsletter-status"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="wanky-newsletter-email">
              Email address
            </label>
            <input
              id="wanky-newsletter-email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email address"
              disabled={state === "submitting"}
              className="min-w-0 flex-1 rounded-md border border-white/20 bg-white/[0.05] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-[#FF4D94] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={state === "submitting" || !consent}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#FF4D94] px-6 py-3 text-sm font-bold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {state === "submitting" ? "Submitting" : "Subscribe"}
              {state !== "submitting" && <ArrowRight size={16} />}
            </button>
          </div>

          <div className="mt-3 flex items-start gap-2">
            <input
              id="wanky-newsletter-consent"
              type="checkbox"
              required
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              className="mt-1 h-4 w-4 accent-[#FF4D94]"
            />
            <label
              htmlFor="wanky-newsletter-consent"
              className="text-xs leading-5 text-zinc-400"
            >
              I agree to receive email updates from Wanky Technologies. I can
              unsubscribe at any time.
            </label>
          </div>

          <div
            aria-hidden="true"
            className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
          >
            <label htmlFor="wanky-newsletter-company">Company</label>
            <input
              id="wanky-newsletter-company"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
            />
          </div>

          <p
            id="wanky-newsletter-status"
            aria-live="polite"
            role="status"
            className="mt-3 min-h-5 text-xs leading-5 text-zinc-400"
          >
            {state === "submitting"
              ? "Submitting your request…"
              : state === "idle"
                ? "Confirm your email before receiving updates."
                : statusCopy[state]}
          </p>
        </form>
      </div>
    </section>
  );
}
