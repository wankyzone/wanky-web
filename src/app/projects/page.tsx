"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  return (
    <div className="relative mx-auto max-w-6xl px-4 py-24 space-y-32 bg-white text-black font-sans">
      
      {/* 1. DARK GRADIENT OVERLAY (Subtle, not blue) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-slate-100/50 blur-[120px]" />
      </div>

      {/* 2. REFINED HERO */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <span className="px-4 py-1.5 rounded-full border border-black/5 bg-slate-50 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Portfolio
        </span>
        <h1 className="text-5xl font-bold tracking-tight lg:text-7xl">
          Systems for <span className="text-slate-400">Scale.</span>
        </h1>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          We build the custom internal tools that turn messy manual operations into automated workflows.
        </p>
      </motion.section>

      {/* 3. FEATURED PROJECT — ERS */}
      <section className="relative">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Text Content */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            <div>
              <div className="h-1 w-12 bg-black mb-6" />
              <h2 className="text-4xl font-bold tracking-tighter uppercase">ERS</h2>
              <p className="text-xl font-medium text-slate-600 mt-2">Errand Runner System</p>
            </div>

            <div className="space-y-4 text-slate-500 leading-relaxed border-l-2 border-slate-100 pl-6">
              <p>
                <strong className="text-black">The Friction:</strong> Logistics data was scattered across chats and calls. Real-time tracking didn't exist.
              </p>
              <p>
                <strong className="text-black">The Architecture:</strong> A central dispatch hub with automated payouts and live runner telemetry.
              </p>
            </div>

            {/* Outcome Stats */}
            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-8">
              <div>
                <p className="text-2xl font-bold text-black">Zero</p>
                <p className="text-sm text-slate-500 font-medium">Lost Jobs</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-black">100%</p>
                <p className="text-sm text-slate-500 font-medium">Auto-Billing</p>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-block rounded-full bg-black px-10 py-4 text-sm font-bold text-white transition-all hover:bg-zinc-800 hover:scale-[1.02] active:scale-95"
            >
              Build a System Like This
            </Link>
          </div>

          {/* Visual Content (The Dashboard Preview) */}
          <div className="lg:col-span-7">
            <div className="aspect-[4/3] rounded-[2.5rem] bg-black border-[12px] border-slate-50 shadow-2xl overflow-hidden relative group">
                {/* Visual Placeholder: A dark, futuristic dashboard vibe */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black opacity-90" />
                
                {/* Mock UI Elements */}
                <div className="absolute inset-12 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-xl p-8 shadow-inner">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="h-3 w-3 rounded-full bg-red-500/50" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                        <div className="h-3 w-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="h-6 w-1/2 bg-white/20 rounded-md mb-6" />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-32 bg-white/10 rounded-xl border border-white/5" />
                        <div className="h-32 bg-white/10 rounded-xl border border-white/5" />
                    </div>
                    <div className="mt-4 h-24 bg-white/5 rounded-xl border border-white/5" />
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. REFINED PROCESS SECTION */}
      <section className="rounded-[3rem] bg-zinc-900 p-12 lg:p-20 text-white overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold tracking-tight">Our Deployment Protocol</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-12">
              {[
                { title: "Audit", desc: "We map your current data leaks and identify the most critical automation needs." },
                { title: "Build", desc: "Production-ready code architecture designed to handle enterprise loads." },
                { title: "Deploy", desc: "Seamless migration from spreadsheets to your new custom engine." }
              ].map((step, i) => (
                  <div key={i} className="space-y-4">
                      <div className="text-zinc-600 font-mono text-xs tracking-widest uppercase">Phase 0{i+1}</div>
                      <h3 className="font-bold text-xl">{step.title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
              ))}
          </div>
        </div>
        {/* Subtle background texture for the black box */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full -mr-20 -mt-20" />
      </section>

    </div>
  );
}