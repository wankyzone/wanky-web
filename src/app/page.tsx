"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#FF4D94] selection:text-white">
      
      {/* 1. HERO SECTION */}
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
                Book a Demo
              </Link>
              <Link
                href="/platform"
                className="rounded-full border border-slate-200 bg-white px-10 py-4 text-sm font-bold text-black transition-all hover:bg-slate-50"
              >
                Explore Platform
              </Link>
            </div>
          </div>
        </motion.section>

        {/* 2. DASHBOARD PREVIEW SECTION (Ref: Image 7) */}
        <section className="mt-32 rounded-[3rem] bg-zinc-900 p-12 lg:p-20 text-white relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold tracking-tight">Real-time control, <br/>without leaving the dashboard.</h2>
            <p className="mt-6 text-base text-zinc-400 leading-relaxed">
              The ERS Admin Interface gives you 100% visibility over every errand, runner, and financial node in your network.
            </p>
            <div className="mt-8 flex justify-center gap-2">
                {["Task Manager", "Fleet Telemetry", "Reconciliation"].map((tab, i) => (
                    <div key={tab} className={`px-5 py-2.5 rounded-full border text-[11px] font-bold uppercase tracking-widest ${i === 0 ? "border-[#FF4D94] text-white" : "border-white/10 text-zinc-500"}`}>
                        {tab}
                    </div>
                ))}
            </div>
          </div>

          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            className="aspect-[16/10] rounded-2xl bg-white/5 border border-white/10 p-4 shadow-2xl relative overflow-hidden group"
          >
            {/* Visual Placeholder for actual Dashboard Screenshot */}
            <div className="absolute inset-0 bg-[#FF4D94]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Mock Dashboard UI */}
            <div className="flex flex-col gap-4 h-full relative z-10">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <div className="h-5 w-1/4 bg-white/10 rounded-md" />
                    <div className="flex gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500/30" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/30" />
                        <div className="h-3 w-3 rounded-full bg-green-500/30" />
                    </div>
                </div>
                <div className="grid grid-cols-10 gap-4 flex-grow">
                    <div className="col-span-3 h-full bg-white/5 rounded-xl border border-white/5 flex flex-col justify-end p-4">
                        <div className="h-3 w-1/2 bg-zinc-600 rounded mb-2" />
                        <div className="h-2 w-full bg-zinc-700 rounded" />
                    </div>
                    <div className="col-span-7 h-full bg-white/[0.02] rounded-xl border border-white/5 p-4 flex flex-col gap-3">
                        <div className="h-3 w-1/3 bg-zinc-700 rounded" />
                        {[1, 2, 3, 4].map(i => <div key={i} className="h-2 w-full bg-zinc-800 rounded"/>)}
                    </div>
                </div>
            </div>
          </motion.div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#FF4D94]/10 blur-[100px] rounded-full" />
        </section>

        {/* 3. GITHUB/BUILD IN SECONDS SECTION (Ref: Image 6) */}
        <section className="mt-40 rounded-[3rem] bg-black p-12 lg:p-20 text-white text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-6">Start building in seconds.</h2>
          <p className="text-zinc-400 max-w-xl mx-auto mb-12 text-sm leading-relaxed">
            The Wanky architecture is modular by default. Integrate our core logic into your 
            stack or kickstart your next logistics project with our pre-built templates.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/platform"
              className="rounded-full bg-white px-10 py-4 text-sm font-bold text-black transition-all hover:bg-slate-100"
            >
              Explore the Platform
            </Link>
            <a 
              href="https://github.com/wankyzone" // REPLACE WITH YOUR ACTUAL GITHUB URL
              target="_blank" 
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 bg-black px-10 py-4 text-sm font-bold text-white transition-all hover:bg-white/5"
            >
              Official GitHub Library
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}