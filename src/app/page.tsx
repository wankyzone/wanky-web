"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import DemoPanel from "@/components/DemoPanel";
import { 
  Terminal, 
  MapPin, 
  CreditCard, 
  LayoutDashboard, 
  Package, 
  Cloud,
  X
} from "lucide-react";

/* ================= FEATURES ================= */
const FEATURES = [
  {
    title: "Dispatch Engine",
    desc: "Automate assignment, routing, and execution of errands in real time.",
    icon: <MapPin className="w-6 h-6 text-pink-500" />
  },
  {
    title: "Telemetry Layer",
    desc: "Track runners, jobs, and movement with live system visibility.",
    icon: <Terminal className="w-6 h-6 text-indigo-500" />
  },
  {
    title: "Financial Core",
    desc: "Control payouts, escrow, and transaction flow with precision.",
    icon: <CreditCard className="w-6 h-6 text-emerald-500" />
  },
  {
    title: "Admin Control",
    desc: "Operate your entire logistics network from a single dashboard.",
    icon: <LayoutDashboard className="w-6 h-6 text-amber-500" />
  },
];

export default function Home() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  // Subdomain awareness logic (simulated for UI)
  const isSubdomain = typeof window !== "undefined" && window.location.host.includes("ers.");

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-pink-100">
      
      {/* ================= PREVIEW MODAL ================= */}
      <AnimatePresence>
        {isDemoOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDemoOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl h-[80vh] bg-zinc-900 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl"
            >
              <button 
                onClick={() => setIsDemoOpen(false)}
                className="absolute top-6 right-6 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition"
              >
                <X size={20} />
              </button>
              <DemoPanel />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= HERO ================= */}
      <div className="mx-auto max-w-6xl px-6 py-20 lg:pt-32">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[3rem] border border-slate-100 bg-slate-50/40 px-8 py-20 lg:px-20 relative overflow-hidden"
        >
          <div className="max-w-4xl relative z-10">
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-pink-500">
              <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
              {isSubdomain ? "Logged into ERS Node" : "Private Beta"}
            </span>

            <h1 className="mt-8 text-6xl font-bold leading-[0.9] tracking-tighter sm:text-7xl lg:text-8xl">
              The Operating System <br />
              for <span className="text-slate-400 italic underline decoration-pink-500/30">Logistics</span>
            </h1>

            <p className="mt-10 max-w-xl text-lg text-slate-500">
              Wanky powers businesses that move in the physical world.
              Automate operations, unify data, and scale execution from a single system.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-black px-10 py-4 text-sm font-bold text-white hover:bg-zinc-800 transition shadow-lg shadow-black/10"
              >
                Book a Demo
              </Link>

              <button
                onClick={() => setIsDemoOpen(true)}
                className="rounded-full border border-slate-200 bg-white px-10 py-4 text-sm font-bold hover:bg-slate-50 transition flex items-center gap-2"
              >
                View Demo Preview
              </button>
            </div>
          </div>
        </motion.section>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        
        {/* ================= FEATURES WITH ANIMATION ================= */}
        <section className="py-32">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl font-bold">Everything you need to run logistics at scale.</h2>
            <p className="mt-6 text-slate-500">Modular systems designed to replace fragmented workflows.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="group relative p-8 rounded-2xl border border-slate-100 bg-white overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="mb-4 p-3 rounded-xl bg-slate-50 w-fit group-hover:scale-110 transition-transform">
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= PRODUCTS WITH GLOW ================= */}
        <section className="py-32">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl font-bold">A unified system for operations and infrastructure.</h2>
            <p className="mt-6 text-slate-500">Execution and infrastructure into a single operating layer.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* ERS */}
            <motion.a
              href="https://ers.wankysoftware.com"
              target="_blank"
              whileHover={{ y: -10 }}
              className="group relative p-10 rounded-[2.5rem] border border-slate-100 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:shadow-pink-500/5 transition-all"
            >
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl group-hover:bg-pink-500/10 transition-colors" />
              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-widest text-pink-500">Core System</div>
                  <Package className="w-6 h-6 text-pink-500" />
                </div>
                <h3 className="text-3xl font-bold mb-4">ERS (Errand Runner System)</h3>
                <p className="text-slate-500 mb-8 text-lg">Manage logistics, assign errands, and track operations in real time.</p>
                <span className="inline-flex items-center gap-2 font-bold group-hover:gap-4 transition-all">
                  Open ERS <span className="text-pink-500">→</span>
                </span>
              </div>
            </motion.a>

            {/* WANKY CLOUD */}
            <motion.a
              href="https://wankycloud.wankysoftware.com"
              target="_blank"
              whileHover={{ y: -10 }}
              className="group relative p-10 rounded-[2.5rem] border border-slate-100 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all"
            >
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors" />
              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-widest text-indigo-500">Infrastructure</div>
                  <Cloud className="w-6 h-6 text-indigo-500" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Wanky Cloud</h3>
                <p className="text-slate-500 mb-8 text-lg">Storage, compute, and backend systems powering modern logistics.</p>
                <span className="inline-flex items-center gap-2 font-bold group-hover:gap-4 transition-all">
                  Explore Cloud <span className="text-indigo-500">→</span>
                </span>
              </div>
            </motion.a>
          </div>
        </section>

        {/* ================= DASHBOARD PREVIEW SECTION ================= */}
        <section className="rounded-[3rem] bg-zinc-900 p-8 md:p-16 text-white overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold">Full operational visibility.</h2>
            <p className="mt-6 text-zinc-400">Monitor errands, runners, and transactions in real time.</p>
          </div>

          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="h-[500px] rounded-2xl bg-black/50 border border-white/10 overflow-hidden shadow-2xl"
          >
            <DemoPanel />
          </motion.div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-32 text-center">
          <motion.div
             whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
             viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold tracking-tight">Start building your <br/>logistics system.</h2>
            <p className="mt-6 text-slate-500 text-lg">Join the private beta and deploy your first module today.</p>

            <div className="mt-12">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 rounded-full bg-black px-12 py-6 text-white font-bold hover:bg-zinc-800 transition"
              >
                Apply for Beta
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-100 py-12 bg-slate-50/30">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-6">
            <span className="font-bold text-black">Wanky.</span>
            <span>© 2026 Wanky Infrastructure</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <span>All Nodes Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}