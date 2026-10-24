"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Audience = { enabled: boolean; confirmedRecipients: number | null; message: string };
type Draft = { id: string; subject: string; body: string; status: string; updated_at: string };

export default function FounderNewsletterPage() {
  const router = useRouter();
  const [audience, setAudience] = useState<Audience | null>(null);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [id, setId] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [a, d] = await Promise.all([
        fetch("/api/founder/newsletter", { cache: "no-store" }),
        fetch("/api/founder/newsletter/campaigns", { cache: "no-store" }),
      ]);
      if (a.status === 401 || d.status === 401) { router.replace("/founder/login"); return; }
      const ad = await a.json();
      const dd = await d.json();
      if (!a.ok) throw new Error(ad.error || "Could not load audience.");
      if (!d.ok) throw new Error(dd.error || "Could not load drafts. Apply the newsletter draft migration first.");
      setAudience(ad);
      setDrafts(dd.drafts || []);
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to load newsletter operations."); }
    finally { setLoading(false); }
  }, [router]);

  useEffect(() => { void load(); }, [load]);

  function selectDraft(draft?: Draft) {
    setId(draft?.id || "");
    setSubject(draft?.subject || "");
    setBody(draft?.body || "");
    setNotice("");
    setError("");
  }

  async function save() {
    setSaving(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/founder/newsletter/campaigns", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id || undefined, subject, body }),
      });
      if (response.status === 401) { router.replace("/founder/login"); return; }
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Draft save failed.");
      const draft = data.draft as Draft;
      setId(draft.id);
      setDrafts((old) => [draft, ...old.filter((item) => item.id !== draft.id)]);
      setNotice("Draft saved successfully. Campaign broadcasting remains disabled.");
    } catch (e) { setError(e instanceof Error ? e.message : "Draft save failed."); }
    finally { setSaving(false); }
  }

  return <main className="min-h-screen bg-[#09090b] px-4 py-8 text-white sm:px-8"><div className="mx-auto max-w-6xl">
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6"><div><p className="text-xs font-bold uppercase tracking-[.25em] text-pink-400">Wanky Technologies</p><h1 className="mt-2 text-3xl font-semibold">Newsletter Operations</h1><p className="mt-2 text-sm text-zinc-400">Campaign preparation · Confirmed subscribers only</p></div><button onClick={() => router.push("/founder")} className="rounded-xl border border-white/15 px-4 py-2 text-sm">Back to Control Centre</button></header>
    <section className="mt-7 grid gap-4 md:grid-cols-[.8fr_1.2fr]">
      <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><p className="text-sm text-zinc-400">Eligible newsletter audience</p><p className="mt-3 text-4xl font-semibold">{loading ? "…" : audience?.confirmedRecipients ?? "—"}</p><p className="mt-3 text-sm leading-6 text-zinc-400">{audience?.message || "Confirmed subscribers only."}</p><p className="mt-5 text-xs leading-5 text-zinc-500">Interest-form leads and ERS waitlist contacts are not included.</p>
        <div className="mt-6 border-t border-white/10 pt-5"><div className="flex items-center justify-between"><h2 className="font-semibold">Saved drafts</h2><button onClick={() => selectDraft()} className="text-sm text-pink-300">New draft</button></div>{drafts.length === 0 ? <p className="mt-3 text-sm text-zinc-500">No saved drafts yet.</p> : <ul className="mt-3 space-y-2">{drafts.map((draft) => <li key={draft.id}><button onClick={() => selectDraft(draft)} className={`w-full rounded-xl border p-3 text-left ${id === draft.id ? "border-pink-400/50 bg-pink-400/10" : "border-white/10"}`}><span className="block truncate text-sm">{draft.subject}</span><span className="mt-1 block text-xs text-zinc-500">{draft.status} · {new Date(draft.updated_at).toLocaleDateString()}</span></button></li>)}</ul>}</div>
      </article>
      <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6"><div className="flex items-start justify-between gap-3"><div><h2 className="text-lg font-semibold">Campaign composer</h2><p className="mt-1 text-sm text-zinc-400">Save and preview before delivery.</p></div><span className="rounded-full border border-amber-300/30 px-3 py-1 text-xs text-amber-200">Preview only</span></div>
        <label className="mt-6 block text-sm font-medium">Email subject<input value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={160} placeholder="e.g. Wanky Weekly — what we're building" className="mt-2 w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm outline-none focus:border-pink-400"/></label>
        <label className="mt-4 block text-sm font-medium">Message<textarea value={body} onChange={(e) => setBody(e.target.value)} maxLength={12000} rows={9} placeholder="Write your campaign message…" className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-black px-4 py-3 text-sm leading-6 outline-none focus:border-pink-400"/></label><p className="mt-2 text-xs text-zinc-500">{body.length}/12,000 characters</p>
        <div className="mt-6 rounded-xl border border-white/10 bg-black/40 p-5"><p className="text-xs font-bold uppercase tracking-widest text-pink-300">Email preview</p><h3 className="mt-3 break-words text-xl font-semibold">{subject.trim() || "Your campaign subject"}</h3><p className="mt-4 whitespace-pre-wrap break-words text-sm leading-6 text-zinc-300">{body.trim() || "Your message preview will appear here as you write."}</p><p className="mt-6 border-t border-white/10 pt-4 text-xs text-zinc-500">Wanky Technologies · You are receiving this because you confirmed your newsletter subscription.</p></div>
        {error && <p role="alert" className="mt-4 rounded-xl bg-red-950/60 p-3 text-sm text-red-200">{error}</p>}{notice && <p role="status" className="mt-4 rounded-xl border border-emerald-400/20 p-3 text-sm text-emerald-200">{notice}</p>}
        <button onClick={() => void save()} disabled={saving || !subject.trim() || !body.trim()} className="mt-5 w-full rounded-xl bg-pink-500 px-4 py-3 text-sm font-semibold disabled:opacity-40">{saving ? "Saving…" : id ? "Save changes" : "Save campaign draft"}</button><button disabled className="mt-3 w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-500">Send campaign — not enabled yet</button><p className="mt-3 text-xs leading-5 text-zinc-500">Broadcast delivery stays disabled until per-recipient unsubscribe links, idempotent sending, and delivery result tracking are verified.</p>
      </article>
    </section></div></main>;
}
