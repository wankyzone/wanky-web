"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function SystemsPage() {
  return (
    <div className="relative mx-auto max-w-6xl px-6 py-24 lg:py-32 bg-white text-black font-sans space-y-32">
      
      {/* 1. HERO SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl"
      >
        <span className="px-3 py-1 rounded-full border border-black/10 bg-slate-50 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          Core Capabilities
        </span>
        <h1 className="mt-6 text-5xl font-bold tracking-tight lg:text-7xl leading-[1.1]">
          Software built for <span className="text-slate-400 font-medium italic">Operating.</span>
        </h1>
        <p className="mt-8 text-xl text-slate-500 max-w-2xl leading-relaxed">
          We replace fragile spreadsheets and chaotic WhatsApp workflows with 
          modular, production-ready internal systems.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-black px-8 py-4 text-sm font-bold text-white transition-all hover:bg-zinc-800 hover:scale-[1.02] active:scale-95"
          >
            Request a System Audit
          </Link>
          <Link
            href="/pricing"
            className="rounded-full border border-slate-200 px-8 py-4 text-sm font-bold text-black transition-all hover:bg-slate-50"
          >
            Engagement Models
          </Link>
        </div>
      </motion.section>

      {/* 2. SYSTEM ARCHITECTURE (Dark Section) */}
      <section className="rounded-[3rem] bg-zinc-900 p-10 lg:p-20 text-white overflow-hidden relative">
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
            <h2 className="text-3xl font-bold tracking-tight uppercase italic">The Modular Engine</h2>
            <p className="text-zinc-400 max-w-md text-sm leading-relaxed">
              Every build is structured into mission-critical modules that provide 
              centralized control and high-fidelity audit trails.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: "Admin Dashboards", desc: "Centralized command for user management and global settings." },
              { title: "Dispatch Engines", desc: "Real-time task allocation with automated priority routing." },
              { title: "Financial Hubs", desc: "Automated payouts, invoicing, and payment reconciliation." },
              { title: "Audit Protocols", desc: "Immutable logs of every action taken within the system." },
              { title: "Automation Logic", desc: "Event-driven workflows that eliminate manual data entry." },
              { title: "Telemetry & Reporting", desc: "Live visualization of operational health and efficiency." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
              >
                <div className="h-1 w-8 bg-zinc-700 mb-6" />
                <h3 className="font-bold text-lg mb-2 tracking-tight">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/5 blur-[120px] rounded-full" />
      </section>

      {/* 3. IDEAL USE CASES (The "Who it's for") */}
      <section className="grid lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5">
            <h2 className="text-4xl font-bold tracking-tighter mb-6">Built for the <br/>Infrastructure-Minded.</h2>
            <p className="text-slate-500 leading-relaxed mb-8">
                We don't build "fancy" apps for the sake of it. We build for founders and operators 
                who are tired of their systems breaking as they grow.
            </p>
            <div className="space-y-4">
                {[
                    "Transitioning from Sheets to Software",
                    "Scaling Operations beyond 10+ people",
                    "Managing high-frequency logistics/errands",
                    "Requiring strict data accountability"
                ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-slate-400">
                        <div className="h-px w-6 bg-slate-200" />
                        {text}
                    </div>
                ))}
            </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="aspect-square rounded-3xl bg-slate-50 border border-slate-100 p-8 flex flex-col justify-end">
                <span className="text-4xl font-bold italic mb-2">01.</span>
                <p className="font-bold text-xs uppercase tracking-tighter">Eliminate Slack Chaos</p>
            </div>
            <div className="aspect-square rounded-3xl bg-zinc-900 text-white p-8 flex flex-col justify-end">
                <span className="text-4xl font-bold italic mb-2">02.</span>
                <p className="font-bold text-xs uppercase tracking-tighter text-zinc-400">Automate Reporting</p>
            </div>
            <div className="aspect-square rounded-3xl bg-zinc-900 text-white p-8 flex flex-col justify-end">
                <span className="text-4xl font-bold italic mb-2">03.</span>
                <p className="font-bold text-xs uppercase tracking-tighter text-zinc-400">Centralize Data</p>
            </div>
            <div className="aspect-square rounded-3xl bg-slate-50 border border-slate-100 p-8 flex flex-col justify-end">
                <span className="text-4xl font-bold italic mb-2">04.</span>
                <p className="font-bold text-xs uppercase tracking-tighter">Scale Payouts</p>
            </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 border-t border-slate-100 text-center space-y-8"
      >
        <h2 className="text-4xl font-bold tracking-tight">Stop building on sand.</h2>
        <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
          If your current business systems feel like they're held together by tape, 
          it's time for a professional architecture.
        </p>
        <Link
            href="/contact"
            className="inline-block rounded-full bg-black px-12 py-5 text-sm font-bold text-white transition-all hover:bg-zinc-800"
        >
            Start the Transition
        </Link>
      </motion.section>

    </div>
  );
}