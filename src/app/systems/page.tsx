"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function SystemsPage() {
  const modules = [
    { 
      title: "Core Admin Engine", 
      desc: "The nerve center. Manage global configurations, multi-tenant roles, and high-level system health from a single dashboard." 
    },
    { 
      title: "Dynamic Dispatcher", 
      desc: "Our proprietary logic for automated task routing. It handles the complexity of real-world logistics in milliseconds." 
    },
    { 
      title: "Ledger & Payouts", 
      desc: "A hardened financial layer. Automated reconciliation and instant payouts designed for high-volume transactions." 
    },
    { 
      title: "Real-time Telemetry", 
      desc: "Live field data tracking. Every movement is logged and visualized to provide total operational transparency." 
    },
    { 
      title: "Automation Engine", 
      desc: "Trigger-based workflows that eliminate manual intervention. If it happens in the field, the system reacts instantly." 
    },
    { 
      title: "Audit Protocols", 
      desc: "Enterprise-grade security. Every action within the Wanky ecosystem is timestamped and immutable." 
    },
  ];

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-24 lg:py-32 bg-white text-black font-sans">
      
      {/* 1. HEADER: THE ARCHITECTURE */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mb-24"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF4D94]">
          System Architecture
        </span>
        <h1 className="mt-6 text-5xl font-bold tracking-tight lg:text-7xl leading-[1.1]">
          Engineered for <br />
          <span className="text-slate-400 italic">Resilience.</span>
        </h1>
        <p className="mt-8 text-xl text-slate-500 leading-relaxed">
          Wanky isn't just an app—it's a modular infrastructure built to handle 
          the unpredictable nature of physical operations at scale.
        </p>
      </motion.section>

      {/* 2. MODULAR GRID */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((m, i) => (
          <motion.div 
            key={m.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group relative p-8 rounded-[2rem] border border-slate-100 bg-slate-50/30 hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all"
          >
            <div className="mb-6 flex items-center justify-between">
                <div className="h-2 w-2 rounded-full bg-[#FF4D94]" />
                <span className="font-mono text-[10px] text-slate-300">MOD_0{i + 1}</span>
            </div>
            <h3 className="text-lg font-bold tracking-tight uppercase mb-3">{m.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {m.desc}
            </p>
          </motion.div>
        ))}
      </section>

      {/* 3. TECH STACK (The "Startup" Credibility) */}
      <section className="mt-32 rounded-[3rem] bg-zinc-900 p-12 lg:p-20 text-white overflow-hidden relative">
        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-3xl font-bold tracking-tighter uppercase italic mb-6 text-[#FF4D94]">The Stack</h2>
                <p className="text-zinc-400 leading-relaxed mb-8">
                    We build on a modern, cloud-native foundation to ensure 99.9% uptime 
                    and sub-second latency across all operational nodes.
                </p>
                <div className="flex flex-wrap gap-3">
                    {["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "AWS"].map((tech) => (
                        <span key={tech} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[#FF4D94] font-bold text-2xl mb-1">0ms</p>
                    <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Cold Start</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[#FF4D94] font-bold text-2xl mb-1">E2E</p>
                    <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Encryption</p>
                </div>
            </div>
        </div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#FF4D94]/10 blur-[100px] rounded-full" />
      </section>

      {/* 4. FINAL CALL TO ACTION */}
      <section className="mt-40 border-t border-slate-100 pt-20 text-center">
        <h2 className="text-4xl font-bold tracking-tight mb-8">Ready to deploy?</h2>
        <Link 
            href="/contact"
            className="inline-block rounded-full bg-black px-12 py-5 text-sm font-bold text-white transition-all hover:bg-zinc-800"
        >
            Request Implementation Audit
        </Link>
      </section>

    </div>
  );
}