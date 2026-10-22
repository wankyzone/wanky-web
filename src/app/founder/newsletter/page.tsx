"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AudienceState = {
  enabled: boolean;
  confirmedRecipients: number | null;
  message: string;
};

export default function FounderNewsletterPage() {
  const router = useRouter();
  const [audience, setAudience] = useState<AudienceState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/founder/newsletter", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 401) {
          router.replace("/founder/login");
          return;
        }
        if (!response.ok) throw new Error(data.error || "Unable to load newsletter audience.");
        if (active) setAudience(data);
      })
      .catch((reason: unknown) => {
        if (active) setError(reason instanceof Error ? reason.message : "Unable to load newsletter audience.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [router]);

  return (
    <main className="min-h-screen bg-[#09090b] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.25em] text-pink-400">Wanky Technologies</p>
            <h1 className="mt-2 text-3xl font-semibold">Newsletter Operations</h1>
            <p className="mt-2 text-sm text-zinc-400">Campaign preparation · Confirmed subscribers only</p>
          </div>
          <button onClick={() => router.push("/founder")} className="rounded-xl border border-white/15 px-4 py-2 text-sm">Back to Control Centre</button>
        </header>

        <section className="mt-7 grid gap-4 md:grid-cols-[.8fr_1.2fr]">
          <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-zinc-400">Eligible newsletter audience</p>
            <p className="mt-3 text-4xl font-semibold">{loading ? "…" : audience?.confirmedRecipients ?? "—"}</p>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{audience?.message || (error ? error : "Checking newsletter configuration…")}</p>
            {audience && !audience.enabled && <p className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 text-sm text-amber-100">Newsletter sending is not active in this environment.</p>}
            {error && <p role="alert" className="mt-4 rounded-xl bg-red-950/60 p-3 text-sm text-red-200">{error}</p>}
            <p className="mt-5 text-xs leading-5 text-zinc-500">This audience is sourced from the existing newsletter backend. Interest-form leads and ERS waitlist contacts are not included.</p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Campaign composer</h2>
                <p className="mt-1 text-sm text-zinc-400">Draft and preview the message before enabling delivery.</p>
              </div>
              <span className="rounded-full border border-amber-300/30 px-3 py-1 text-xs text-amber-200">Preview only</span>
            </div>
            <label className="mt-6 block text-sm font-medium">Email subject
              <input value={subject} onChange={(event) => setSubject(event.target.value)} maxLength={160} placeholder="e.g. Wanky Weekly — what we're building" className="mt-2 w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm outline-none focus:border-pink-400" />
            </label>
            <label className="mt-4 block text-sm font-medium">Message
              <textarea value={body} onChange={(event) => setBody(event.target.value)} maxLength={12000} rows={9} placeholder="Write your campaign message…" className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-black px-4 py-3 text-sm leading-6 outline-none focus:border-pink-400" />
            </label>
            <p className="mt-2 text-xs text-zinc-500">{body.length}/12,000 characters</p>
            <div className="mt-6 rounded-xl border border-white/10 bg-black/40 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-pink-300">Email preview</p>
              <h3 className="mt-3 text-xl font-semibold">{subject.trim() || "Your campaign subject"}</h3>
              <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-6 text-zinc-300">{body.trim() || "Your message preview will appear here as you write."}</p>
              <p className="mt-6 border-t border-white/10 pt-4 text-xs text-zinc-500">Wanky Technologies · You are receiving this because you confirmed your newsletter subscription.</p>
            </div>
            <button type="button" disabled className="mt-5 w-full cursor-not-allowed rounded-xl bg-pink-500/40 px-4 py-3 text-sm font-semibold text-white/70">Send campaign — not enabled yet</button>
            <p className="mt-3 text-xs leading-5 text-zinc-500">Delivery stays disabled until campaign persistence, per-recipient unsubscribe links, idempotent send tracking, and delivery results are implemented. This prevents accidental or non-compliant bulk email.</p>
          </article>
        </section>
      </div>
    </main>
  );
}
