"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Cloud, Code2, Mail, ShieldCheck, Sparkles, Workflow } from "lucide-react";

const paths = [
  { id: "ers", name: "ERS", description: "Errand Runner System and marketplace updates", icon: Workflow },
  { id: "wanky-cloud", name: "Wanky Cloud", description: "Hosting and infrastructure interest", icon: Cloud },
  { id: "wanky-ai", name: "Wanky AI", description: "AI software, agents, and engineering", icon: Sparkles },
  { id: "wanky-protect", name: "Wanky Protect", description: "Security and protection initiatives", icon: ShieldCheck },
  { id: "software-services", name: "Software & engineering", description: "Product development, integrations, or technical work", icon: Code2 },
  { id: "partnership", name: "Partnership / general inquiry", description: "Collaboration, business, or something else", icon: Mail },
] as const;

const goals = ["Get product updates", "Join an early-access or feedback group", "Discuss a project or service", "Explore a partnership", "Ask a question", "Other"];
const budgets = ["Not sure yet", "No budget yet / just exploring", "Under ₦100,000", "₦100,000–₦500,000", "₦500,000–₦2,000,000", "Above ₦2,000,000", "Prefer not to say"];

type FormState = {
  product: string; name: string; email: string; organization: string;
  role: string; goal: string; details: string; timeline: string; budget: string;
  updatesConsent: boolean; website: string;
};
const initial: FormState = { product: "", name: "", email: "", organization: "", role: "", goal: "", details: "", timeline: "", budget: "", updatesConsent: false, website: "" };

export default function InterestOnboarding() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const selected = useMemo(() => paths.find((p) => p.id === form.product), [form.product]);
  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((prev) => ({ ...prev, [key]: value }));

  const submit = async () => {
    setStatus("submitting"); setError("");
    try {
      const response = await fetch("/api/interest", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "We couldn't submit your interest. Please try again.");
      setStatus("success");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") return (
    <main className="min-h-[70vh] bg-white px-6 py-24 text-zinc-950">
      <section className="mx-auto max-w-2xl rounded-[2rem] border border-zinc-200 p-8 text-center shadow-sm sm:p-14">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><CheckCircle2 size={32} /></div>
        <p className="mt-7 text-xs font-bold uppercase tracking-[0.24em] text-[#D92D78]">Submission received</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">Thanks for your interest{form.name ? `, ${form.name.split(" ")[0]}` : ""}.</h1>
        <p className="mx-auto mt-5 max-w-lg leading-7 text-zinc-600">Your details have been submitted to Wanky. We’ll review your message and follow up if there’s a suitable next step. This is an inquiry—not an automatic signup, service commitment, or guarantee of early access.</p>
        {form.product === "ers" && <a href="https://ers.wankysoftware.com/waitlist" className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-[#D92D78]">Join the separate ERS waitlist <ArrowRight size={16} /></a>}
        <div className="mt-8"><Link href="/" className="text-sm font-semibold text-zinc-500 hover:text-black">Return to Wanky</Link></div>
      </section>
    </main>
  );

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="border-b border-zinc-100 bg-[#08080A] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/70"><span className="h-1.5 w-1.5 rounded-full bg-[#FF4D94]" /> Wanky interest</p>
          <h1 className="mt-7 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">Let’s start with what you need.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">A short guided introduction to the part of Wanky you’re interested in. Share only what’s relevant; we’ll use it to understand your inquiry and determine a sensible next step.</p>
          <div className="mt-9 flex items-center gap-3" aria-label={`Step ${step + 1} of 3`}>
            {[0,1,2].map((n) => <div key={n} className={`h-1.5 flex-1 rounded-full ${n <= step ? "bg-[#FF4D94]" : "bg-white/15"}`} />)}
          </div>
          <p className="mt-3 text-xs text-white/45">STEP {step + 1} OF 3</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          {step === 0 && <>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D92D78]">01 · Choose your path</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">What brings you here?</h2>
            <p className="mt-3 text-zinc-600">Choose the closest match. You can explain the details in the next step.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {paths.map((path) => { const Icon = path.icon; const active = form.product === path.id; return <button type="button" key={path.id} onClick={() => update("product", path.id)} className={`rounded-2xl border p-5 text-left transition hover:-translate-y-0.5 hover:border-[#FF4D94] ${active ? "border-[#D92D78] bg-pink-50/70 ring-1 ring-[#D92D78]/20" : "border-zinc-200"}`}><div className="flex items-center justify-between"><span className={`rounded-xl p-2.5 ${active ? "bg-white text-[#D92D78]" : "bg-zinc-50 text-zinc-600"}`}><Icon size={20} /></span><span className={`h-4 w-4 rounded-full border ${active ? "border-[#D92D78] bg-[#D92D78] ring-2 ring-white" : "border-zinc-300"}`} /></div><h3 className="mt-5 font-bold">{path.name}</h3><p className="mt-1 text-sm leading-6 text-zinc-600">{path.description}</p></button>; })}
            </div>
          </>}
          {step === 1 && <>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D92D78]">02 · Tell us a little more</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">What would a useful next step look like?</h2>
            <p className="mt-3 text-zinc-600">A few details help us route your inquiry. Please don’t include passwords, payment details, or sensitive personal information.</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <label className="text-sm font-semibold">I’m here to…<select required value={form.goal} onChange={(e) => update("goal", e.target.value)} className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 font-normal outline-none focus:border-[#D92D78]"><option value="">Choose a goal</option>{goals.map((v)=><option key={v}>{v}</option>)}</select></label>
              <label className="text-sm font-semibold">When are you thinking about this?<select value={form.timeline} onChange={(e)=>update("timeline",e.target.value)} className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 font-normal outline-none focus:border-[#D92D78]"><option value="">No timeline yet</option>{["As soon as practical","Within 1 month","Within 1–3 months","In 3+ months","Just researching"].map(v=><option key={v}>{v}</option>)}</select></label>
              <label className="text-sm font-semibold sm:col-span-2">What should we know? <span className="font-normal text-zinc-400">(optional)</span><textarea value={form.details} onChange={(e)=>update("details",e.target.value)} rows={5} maxLength={3000} placeholder="Describe your question, use case, project, or what you hope to learn…" className="mt-2 w-full resize-y rounded-xl border border-zinc-200 px-4 py-3 font-normal outline-none focus:border-[#D92D78]" /><span className="mt-1 block text-right text-xs font-normal text-zinc-400">{form.details.length}/3000</span></label>
              {["software-services","partnership","wanky-cloud"].includes(form.product) && <label className="text-sm font-semibold sm:col-span-2">Approximate budget <span className="font-normal text-zinc-400">(optional)</span><select value={form.budget} onChange={(e)=>update("budget",e.target.value)} className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 font-normal outline-none focus:border-[#D92D78]"><option value="">Not provided</option>{budgets.map(v=><option key={v}>{v}</option>)}</select></label>}
            </div>
          </>}
          {step === 2 && <>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D92D78]">03 · Your details</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Where can we reach you?</h2>
            <p className="mt-3 text-zinc-600">We’ll use these details to respond to this inquiry. Product updates are optional and separate.</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <label className="text-sm font-semibold">Full name<input required autoComplete="name" value={form.name} onChange={(e)=>update("name",e.target.value)} maxLength={120} className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 font-normal outline-none focus:border-[#D92D78]" placeholder="Your name" /></label>
              <label className="text-sm font-semibold">Email address<input required type="email" autoComplete="email" value={form.email} onChange={(e)=>update("email",e.target.value)} maxLength={254} className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 font-normal outline-none focus:border-[#D92D78]" placeholder="you@example.com" /></label>
              <label className="text-sm font-semibold">Company or organization <span className="font-normal text-zinc-400">(optional)</span><input value={form.organization} onChange={(e)=>update("organization",e.target.value)} maxLength={180} className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 font-normal outline-none focus:border-[#D92D78]" placeholder="Company, team, or project" /></label>
              <label className="text-sm font-semibold">Your role <span className="font-normal text-zinc-400">(optional)</span><input value={form.role} onChange={(e)=>update("role",e.target.value)} maxLength={120} className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 font-normal outline-none focus:border-[#D92D78]" placeholder="Founder, developer, customer…" /></label>
              <label className="flex gap-3 rounded-2xl border border-zinc-200 p-4 text-sm font-normal leading-6 sm:col-span-2"><input type="checkbox" checked={form.updatesConsent} onChange={(e)=>update("updatesConsent",e.target.checked)} className="mt-1 accent-[#D92D78]" /><span><strong className="font-semibold">I’d like occasional product updates.</strong><br/><span className="text-zinc-500">Optional. This does not sign you up to the ERS waitlist or any separate newsletter. You can withdraw this preference later.</span></span></label>
              <label className="hidden" aria-hidden="true">Leave this field empty<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e)=>update("website",e.target.value)} /></label>
            </div>
            <p className="mt-5 text-xs leading-5 text-zinc-500">By submitting, you ask Wanky Technologies to use these details to review and respond to your inquiry. We don’t promise product availability, acceptance, or a particular response time.</p>
          </>}
          {error && <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
          <div className="mt-9 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-6">
            <button type="button" disabled={step===0 || status==="submitting"} onClick={()=>setStep((s)=>s-1)} className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-5 py-3 text-sm font-semibold disabled:opacity-30"><ArrowLeft size={16}/> Back</button>
            {step < 2 ? <button type="button" disabled={(step===0 && !form.product)||(step===1 && !form.goal)} onClick={()=>setStep((s)=>s+1)} className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D92D78] disabled:opacity-40">Continue <ArrowRight size={16}/></button> : <button type="button" disabled={!form.name.trim() || !form.email.trim() || status==="submitting"} onClick={submit} className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D92D78] disabled:opacity-40">{status==="submitting" ? "Submitting…" : "Submit inquiry"} <ArrowRight size={16}/></button>}
          </div>
        </div>
        <aside className="h-fit rounded-3xl bg-zinc-50 p-6 sm:p-7"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D92D78]">Your path</p><h3 className="mt-3 text-xl font-bold">{selected?.name ?? "Choose a Wanky path"}</h3><p className="mt-2 text-sm leading-6 text-zinc-600">{selected?.description ?? "Pick the product or kind of conversation that best matches your interest."}</p><div className="mt-6 border-t border-zinc-200 pt-5"><p className="text-sm font-semibold">What happens next?</p><ul className="mt-3 space-y-3 text-sm leading-6 text-zinc-600"><li>1. Your inquiry is saved securely.</li><li>2. The Wanky team is notified by email when delivery is configured.</li><li>3. We review it and follow up where appropriate.</li></ul></div><p className="mt-6 text-xs leading-5 text-zinc-400">Interested in ERS? This form is separate from the official ERS waitlist.</p></aside>
      </section>
    </main>
  );
}
