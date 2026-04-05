"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#FF4D94] selection:text-white">
      
      {/* 1. HERO SECTION: THE LOGISTICS OS */}
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-32">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[3rem] border border-slate-100 bg-slate-50/30 px-8 py-16 lg:px-20 lg:py-24"
        >
          <div className="relative z-10 max-w-4xl">
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF4D94]">
              <span className="h-2 w-2 rounded-full bg-[#FF4D94] animate-pulse" />
              Now in Private Beta
            </span>

            <h1 className="mt-8 text-6xl font-bold leading-[0.9] tracking-tighter text-black sm:text-7xl lg:text-8xl">
              The OS for <br />
              <span className="text-slate-400 italic underline decoration-[#FF4D94]/30">Unstructured</span> <br />
              Logistics.
            </h1>

            <p className="mt-10 max-w-xl text-lg leading-relaxed text-slate-500">
              Wanky is the infrastructure for businesses that move in the physical world. 
              Automate dispatch, scale telemetry, and centralize operations on a single proprietary engine.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-black px-10 py-4 text-sm font-bold text-white transition-all hover:bg-zinc-800 hover:scale-[1.02] active:scale-95 shadow-xl shadow-black/10"
              >
                Get Started
              </Link>
              <Link
                href="/platform"
                className="rounded-full border border-slate-200 bg-white px-10 py-4 text-sm font-bold text-black transition-all hover:bg-slate-50"
              >
                Explore Platform
              </Link>
            </div>
          </div>

          {/* Background Grid Pattern */}
          <div className="absolute inset-0 -z-10 opacity-[0.03] [mask-image:linear-gradient(to_bottom_left,white,transparent)]">
            <svg width="100%" height="100%"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg>
          </div>
        </motion.section>

        {/* 2. CORE PLATFORM PILLARS */}
        <section className="mt-24 grid gap-8 md:grid-cols-3">
          {[
            { 
              title: "Unified Dispatch", 
              desc: "A centralized engine for task allocation, priority routing, and real-time fleet management." 
            },
            { 
              title: "Operational BI", 
              desc: "High-fidelity data telemetry that turns field activity into actionable business intelligence." 
            },
            { 
              title: "Automated Payouts", 
              desc: "Immutable financial layers for high-velocity billing, payouts, and reconciliation." 
            },
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              className="group rounded-[2rem] border border-slate-100 bg-white p-10 transition-all hover:shadow-2xl hover:shadow-black/5"
            >
              <div className="mb-6 h-1 w-12 bg-[#FF4D94]/20 group-hover:bg-[#FF4D94] transition-colors" />
              <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-500">{item.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* 3. THE FLAGSHIP: ERS (Errand Runner System) */}
        <section className="mt-32 overflow-hidden rounded-[3rem] bg-zinc-900 p-10 lg:p-20 text-white relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF4D94]">Case Study: ERS</span>
              <h2 className="mt-6 text-4xl font-bold tracking-tighter sm:text-5xl">
                Redefining Same-Day <br /> Physical Logistics.
              </h2>
              <p className="mt-8 text-lg text-zinc-400 leading-relaxed">
                ERS is more than an app; it's a complete ecosystem. We built the 
                infrastructure to handle thousands of local tasks with zero friction.
              </p>
              <Link 
                href="/platform" 
                className="mt-10 inline-block border-b border-[#FF4D94]/30 pb-1 text-sm font-bold uppercase tracking-widest hover:border-[#FF4D94] transition-all"
              >
                View Platform Details →
              </Link>
            </div>
            <div className="aspect-video rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative group overflow-hidden">
                {/* Visual Placeholder for Platform Screenshot */}
                <div className="absolute inset-0 bg-[#FF4D94]/5 blur-3xl group-hover:bg-[#FF4D94]/10 transition-colors" />
                <span className="italic text-zinc-600 font-mono text-sm">[ ERS_INTERFACE_V1.0 ]</span>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF4D94]/10 blur-[120px] rounded-full -mr-20 -mt-20" />
        </section>

        {/* 4. THE STARTUP CTAs */}
        <section className="mt-40 text-center">
          <h2 className="text-5xl font-bold tracking-tight mb-8 uppercase italic leading-[1.1]">
            Build on <span className="text-[#FF4D94]">Cloud</span> <br /> Built for <span className="text-slate-300">Scale.</span>
          </h2>
          <p className="text-slate-500 mb-12 max-w-xl mx-auto leading-relaxed">
            Stop stitching together manual workflows. Deploy a professional-grade 
            operating system for your business today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              href="/contact"
              className="rounded-full bg-black px-12 py-5 text-sm font-bold text-white transition-all hover:bg-zinc-800"
            >
              Book a Demo
            </Link>
            <Link 
              href="/pricing"
              className="rounded-full border border-slate-200 px-12 py-5 text-sm font-bold text-black transition-all hover:bg-slate-50"
            >
              Pricing Plans
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}