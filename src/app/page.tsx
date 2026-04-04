"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* 1. HERO SECTION: THE ARCHITECTURAL HOOK */}
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-32">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[3rem] border border-slate-100 bg-slate-50/50 px-8 py-16 lg:px-20 lg:py-24"
        >
          <div className="relative z-10 max-w-4xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
              Lagos // Global Systems Agency
            </span>

            <h1 className="mt-8 text-6xl font-bold leading-[0.9] tracking-tighter text-black sm:text-7xl lg:text-8xl">
              Software for <br />
              <span className="text-slate-400 italic">High-Stakes</span> <br />
              Operations.
            </h1>

            <p className="mt-10 max-w-xl text-lg leading-relaxed text-slate-500">
              We engineer the internal tools, admin engines, and automated 
              workflows that turn operational chaos into a competitive advantage.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/systems"
                className="rounded-full bg-black px-10 py-4 text-sm font-bold text-white transition-all hover:bg-zinc-800 hover:scale-[1.02] active:scale-95 shadow-xl shadow-black/10"
              >
                View Systems
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-slate-200 bg-white px-10 py-4 text-sm font-bold text-black transition-all hover:bg-slate-50"
              >
                Start a Brief
              </Link>
            </div>
          </div>

          {/* Subtle Grid Pattern Background */}
          <div className="absolute inset-0 -z-10 opacity-[0.03] [mask-image:linear-gradient(to_bottom_left,white,transparent)]">
            <svg width="100%" height="100%"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg>
          </div>
        </motion.section>

        {/* 2. THE THREE PILLARS (CAPABILITIES) */}
        <section className="mt-24 grid gap-8 md:grid-cols-3">
          {[
            { 
              title: "Admin Hubs", 
              desc: "Role-based control panels for managing complex permissions, users, and audit trails." 
            },
            { 
              title: "Internal Tools", 
              desc: "Custom-built engines for inventory, logistics, finance, and niche business logic." 
            },
            { 
              title: "Automation", 
              desc: "Eliminating manual entry through event-driven workflows and immutable data logs." 
            },
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              className="group rounded-[2rem] border border-slate-100 bg-white p-10 transition-all hover:shadow-2xl hover:shadow-black/5"
            >
              <div className="mb-6 h-1 w-12 bg-slate-100 group-hover:bg-black transition-colors" />
              <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-500">{item.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* 3. FEATURED BUILD: ERS (Social Proof) */}
        <section className="mt-32 overflow-hidden rounded-[3rem] bg-zinc-900 p-10 lg:p-20 text-white">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Current Spotlight</span>
              <h2 className="mt-6 text-4xl font-bold tracking-tighter sm:text-5xl">
                ERS: The Errand <br /> Runner System.
              </h2>
              <p className="mt-8 text-lg text-zinc-400 leading-relaxed">
                Transforming WhatsApp-based logistics into a centralized dispatch 
                platform with real-time runner telemetry and automated billing.
              </p>
              <Link 
                href="/projects" 
                className="mt-10 inline-block border-b border-white/20 pb-1 text-sm font-bold uppercase tracking-widest hover:border-white transition-all"
              >
                Read Case Study →
              </Link>
            </div>
            <div className="aspect-video rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center italic text-zinc-600">
              [Visual System Preview]
            </div>
          </div>
        </section>

        {/* 4. THE MANIFESTO SNIPPET */}
        <section className="mt-32 flex flex-col lg:flex-row gap-16 lg:items-center">
          <div className="flex-1">
            <h2 className="text-4xl font-bold tracking-tight uppercase">Why Wanky.</h2>
          </div>
          <div className="flex-[2] grid sm:grid-cols-2 gap-12">
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-4">Outcome-Driven</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                We don't sell hours; we sell operational freedom. If a system doesn't 
                increase your efficiency, we don't build it.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-4">Durable Code</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Built with a "Zero-Bugs" mindset and architectural documentation that 
                ensures your system lives for a decade, not a week.
              </p>
            </div>
          </div>
        </section>

        {/* 5. FINAL CALL TO ACTION */}
        <section className="mt-40 text-center">
          <h2 className="text-5xl font-bold tracking-tight mb-8 uppercase italic">Let's build.</h2>
          <p className="text-slate-500 mb-12 max-w-xl mx-auto leading-relaxed">
            Ready to replace your manual processes with a high-performance 
            internal engine? Let's start with an audit.
          </p>
          <div className="flex justify-center gap-6">
            <a 
              href="mailto:hello@wankysoftware.com"
              className="rounded-full bg-black px-12 py-5 text-sm font-bold text-white transition-all hover:bg-zinc-800"
            >
              hello@wankysoftware.com
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}