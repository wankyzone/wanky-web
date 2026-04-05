"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PlatformPage() {
  return (
    <div className="relative mx-auto max-w-6xl px-6 py-24 lg:py-32 bg-white text-black font-sans selection:bg-[#FF4D94] selection:text-white">
      
      {/* 1. PRODUCT HERO */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mb-32"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF4D94]">
          Flagship Deployment
        </span>
        <h1 className="mt-6 text-6xl font-bold tracking-tighter lg:text-8xl leading-[0.9]">
          ERS: The <br />
          <span className="text-slate-400 italic underline decoration-[#FF4D94]/20">Logistics</span> <br />
          Engine.
        </h1>
        <p className="mt-10 text-xl text-slate-500 leading-relaxed max-w-2xl">
          ERS is a high-velocity platform designed to handle the friction of same-day physical logistics. 
          It transforms scattered manual tasks into a centralized, automated dispatch stream.
        </p>
      </motion.section>

      {/* 2. THE THREE LAYERS OF THE PLATFORM */}
      <section className="grid gap-12 lg:grid-cols-2 items-start">
        <div className="space-y-12">
            <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF4D94] mb-4">01 // The Dispatch Layer</h3>
                <p className="text-slate-500 leading-relaxed">
                    A proprietary algorithm that matches errands with available runners based on 
                    proximity, capacity, and historical performance metrics.
                </p>
            </div>
            <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF4D94] mb-4">02 // Real-time Telemetry</h3>
                <p className="text-slate-500 leading-relaxed">
                    Live GPS tracking and task status synchronization across the entire runner network, 
                    providing 100% visibility to central operations.
                </p>
            </div>
            <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF4D94] mb-4">03 // Automated Settlement</h3>
                <p className="text-slate-500 leading-relaxed">
                    Instant payout calculation and customer billing reconciliation. No manual 
                    spreadsheets; just pure, ledger-backed financial clarity.
                </p>
            </div>
        </div>

        <div className="rounded-[3rem] bg-zinc-900 aspect-[4/5] flex flex-col justify-between p-10 text-white relative overflow-hidden group transition-all hover:scale-[1.01]">
            <div className="relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">System Health</span>
                <div className="mt-4 flex gap-2">
                    <div className="h-1 w-12 bg-[#FF4D94]" />
                    <div className="h-1 w-12 bg-white/20" />
                    <div className="h-1 w-12 bg-white/20" />
                </div>
            </div>
            
            <div className="relative z-10">
                <h4 className="text-2xl font-bold tracking-tight">Built for 99.9% Uptime.</h4>
                <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                    The ERS infrastructure is architected to survive the chaos of real-world 
                    delivery environments without data loss.
                </p>
            </div>

            {/* Subtle Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D94]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
      </section>

      {/* 3. FUTURE ROADMAP (The "Startup" vision) */}
      <section className="mt-40 border-t border-slate-100 pt-20">
        <h2 className="text-4xl font-bold tracking-tight mb-16 uppercase italic">Roadmap v2.0</h2>
        <div className="grid gap-6 md:grid-cols-3">
            {["AI-Driven Routing", "Multi-Tenant API", "Native Fleet Apps"].map((feature, i) => (
                <div key={i} className="p-10 rounded-3xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Planned_{i + 1}</span>
                    <h4 className="mt-4 font-bold text-lg">{feature}</h4>
                </div>
            ))}
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="mt-40 text-center space-y-8">
        <h2 className="text-4xl font-bold tracking-tight">Need this infrastructure?</h2>
        <p className="text-slate-500 max-w-lg mx-auto">
            We are currently onboarding a select group of beta partners to our 
            logistics platform.
        </p>
        <Link 
            href="/contact"
            className="inline-block rounded-full bg-black px-12 py-5 text-sm font-bold text-white transition-all hover:bg-zinc-800"
        >
            Apply for Access
        </Link>
      </section>

    </div>
  );
}