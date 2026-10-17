import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Blocks, Cloud, Compass, Fingerprint, LockKeyhole, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Wanky OS — A Connected Technology Vision",
  description: "Explore the long-term Wanky OS vision: a connected technology ecosystem being developed in stages, with honest status and practical engineering foundations.",
};

const ecosystem = [
  { name: "Wanky Cloud", status: "In development", description: "Our direction for infrastructure, deployment, storage, and dependable services that can support Wanky products.", icon: Cloud, href: "/systems" },
  { name: "Wanky Protect", status: "Concept and planning", description: "A security-focused direction. Specific protections and integrations will be described only when implemented and verified.", icon: LockKeyhole, href: "/principles" },
  { name: "Wanky AI", status: "Exploration and development", description: "AI-enabled product experiences and engineering experiments, guided by practical use cases rather than claims alone.", icon: Sparkles, href: "/ai" },
  { name: "Wanky Account", status: "Planned direction", description: "A possible shared account and identity layer, subject to product design, privacy, security, and implementation work.", icon: Fingerprint, href: "/principles" },
];

export default function WankyOSPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="relative overflow-hidden border-b border-zinc-100">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#FF4D94]/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-36 -left-24 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:py-40">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500"><Compass size={15} className="text-[#D92D78]" />Long-term platform vision</div>
            <h1 className="mt-8 text-5xl font-bold leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl">One ecosystem.<br /><span className="text-zinc-400">Built step by step.</span></h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-600 sm:text-xl">Wanky OS is our long-term vision for a more connected experience across Wanky products and services. We are defining the foundations, documenting the architecture, and developing the pieces in stages.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="mailto:wankyzone@gmail.com?subject=Wanky%20OS%20Interest" className="inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#FF4D94]">Share your interest <ArrowRight size={17} /></a>
              <Link href="/blog/building-toward-wanky-os" className="inline-flex items-center gap-3 rounded-full border border-zinc-200 px-7 py-4 text-sm font-semibold transition hover:border-black">Read the vision <ArrowRight size={17} /></Link>
            </div>
            <p className="mt-6 text-sm leading-6 text-zinc-500">Status: in development. Wanky OS is not being presented as a finished or generally available operating system. The capabilities below describe our direction, not current guarantees.</p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D92D78]">The idea</p><h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">More coherence. Less fragmentation.</h2></div>
          <p className="max-w-2xl leading-8 text-zinc-600">As a technology company grows, its products can become separate destinations with different patterns and experiences. Wanky OS is an exploration of how identity, design, documentation, and useful workflows might become more consistent over time—without forcing every product into one shape or pretending integrations exist before they do.</p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {ecosystem.map((item) => { const Icon = item.icon; return <article key={item.name} className="rounded-3xl border border-zinc-200 p-7 transition hover:-translate-y-1 hover:border-[#FF4D94]/60 hover:shadow-xl hover:shadow-pink-500/5 sm:p-9"><div className="flex items-start justify-between gap-4"><div className="rounded-2xl bg-zinc-50 p-3 text-[#D92D78]"><Icon size={24} /></div><span className="rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">{item.status}</span></div><h3 className="mt-7 text-xl font-bold">{item.name}</h3><p className="mt-3 leading-7 text-zinc-600">{item.description}</p><Link href={item.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition hover:text-[#D92D78]">Explore related work <ArrowRight size={15} /></Link></article>; })}
        </div>
        <article className="mt-5 rounded-3xl border border-zinc-200 p-7 sm:p-9"><div className="flex items-start gap-4"><div className="rounded-2xl bg-zinc-50 p-3 text-[#D92D78]"><Blocks size={24} /></div><div><h3 className="text-xl font-bold">Products with their own purpose</h3><p className="mt-3 max-w-3xl leading-7 text-zinc-600">ERS and Wanky Classroom serve distinct needs. They are part of the wider Wanky product landscape, but this page does not imply they already share a Wanky OS identity system or integrated runtime. Any shared experience must be designed, built, and tested first.</p></div></div></article>
      </section>
      <section className="bg-zinc-950 text-white"><div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-2 lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#FF4D94]">How we are approaching it</p><h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">Build foundations before promises.</h2></div><div className="space-y-5 leading-8 text-zinc-300"><p>We will use internal builds, documentation, practical engineering tools, and AI-assisted development experiments where they help. Tool choices—including Google AI tooling being evaluated for development—are part of the process, not proof of product capabilities.</p><p>The work is staged: clarify scope, document system boundaries, prototype the experience, validate security and reliability, and publish concrete progress when it can be demonstrated.</p><p className="text-sm leading-6 text-zinc-400">No release date or full feature set is being announced here. Wanky OS remains in development.</p></div></div></section>
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28"><div className="rounded-[2rem] border border-zinc-200 p-8 sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-10"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D92D78]">Follow the work</p><h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">A vision is only useful when the work is visible.</h2><p className="mt-5 leading-7 text-zinc-600">We will share engineering notes and product updates as decisions, prototypes, and validated capabilities become ready to discuss.</p></div><div className="mt-8 flex shrink-0 flex-wrap gap-4 lg:mt-0"><Link href="/blog" className="inline-flex items-center gap-3 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#FF4D94]">Read the blog <ArrowRight size={16} /></Link><Link href="/principles" className="inline-flex items-center gap-3 rounded-full border border-zinc-200 px-6 py-3.5 text-sm font-semibold transition hover:border-black">Engineering principles</Link></div></div></section>
    </main>
  );
}
