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
  ShieldCheck,
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

      {/* ================= CINEMATIC WANKY HERO ================= */}
      <section className="relative isolate min-h-[680px] overflow-hidden bg-[#08080A] text-white sm:min-h-[740px]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/wanky-hero.png')" }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#08080A] via-[#08080A]/90 to-[#08080A]/15"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#08080A]/90 via-transparent to-[#08080A]/20"
        />

        {/* WANKY NETWORK VISUAL */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] overflow-hidden lg:block"
        >
          <svg
            viewBox="0 0 760 760"
            preserveAspectRatio="xMidYMid meet"
            className="h-full w-full"
            fill="none"
          >
            <defs>
              <radialGradient id="networkGlow">
                <stop offset="0%" stopColor="#FF4D94" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#FF4D94" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="networkLine" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FF4D94" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#FF4D94" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#E4E4E7" stopOpacity="0.12" />
              </linearGradient>
            </defs>

            <circle cx="420" cy="380" r="300" fill="url(#networkGlow)" />

            <g stroke="url(#networkLine)" strokeWidth="1">
              <path d="M380 60 L520 145 L650 105 L700 245 L610 350 L680 480 L560 625 L420 680 L300 590 L155 625 L90 470 L145 330 L70 195 L210 115 Z" />
              <path d="M380 60 L420 270 L520 145 L480 390 L650 105" />
              <path d="M70 195 L300 280 L145 330 L350 430 L90 470" />
              <path d="M210 115 L300 280 L420 270 L610 350 L480 390 L680 480" />
              <path d="M155 625 L350 430 L420 680 L480 390 L560 625" />
              <path d="M300 590 L350 430 L610 350" />
              <path d="M420 270 L350 430 L420 520 L560 625" />
              <path d="M300 280 L480 390 L420 520 L300 590" />
              <path d="M210 115 L420 270 L700 245" />
              <path d="M145 330 L300 590" />
            </g>

            <g stroke="#FF4D94" strokeOpacity="0.38" strokeWidth="1.5">
              <path d="M300 280 L420 270 L480 390 L350 430 Z" />
              <path d="M420 270 L610 350 L480 390" />
              <path d="M350 430 L420 520 L480 390" />
            </g>

            <g fill="#FF4D94">
              {[
                [380, 60], [520, 145], [650, 105], [700, 245],
                [610, 350], [680, 480], [560, 625], [420, 680],
                [300, 590], [155, 625], [90, 470], [145, 330],
                [70, 195], [210, 115], [420, 270], [300, 280],
                [480, 390], [350, 430], [420, 520],
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r={i > 13 ? 4 : 2.5}>
                  {i % 3 === 0 && (
                    <animate
                      attributeName="opacity"
                      values="0.45;1;0.45"
                      dur={`${2 + (i % 4)}s`}
                      repeatCount="indefinite"
                    />
                  )}
                </circle>
              ))}
            </g>

            <g fill="#F9A8D4" opacity="0.7">
              <circle cx="420" cy="270" r="7" />
              <circle cx="480" cy="390" r="5" />
              <circle cx="350" cy="430" r="5" />
            </g>
          </svg>
        </div>


        <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-6 py-20 sm:min-h-[740px] lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-300 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D94]" />
              Wanky Technologies
            </span>

            <h1 className="mt-8 text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              We build the systems
              <span className="mt-3 block text-zinc-400">
                behind what&apos;s next.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-zinc-300 sm:text-lg">
              Software products, operational systems, and infrastructure
              designed to solve real problems and support what comes next.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/platform"
                className="inline-flex items-center gap-3 rounded-full bg-[#FF4D94] px-7 py-4 text-sm font-semibold text-black transition hover:bg-white"
              >
                Explore our products <span aria-hidden="true">→</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-white/25 bg-white/[0.04] px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/10"
              >
                Discuss a project
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs text-zinc-400">
              <span>Product engineering</span>
              <span className="text-[#FF4D94]">/</span>
              <span>Connected systems</span>
              <span className="text-[#FF4D94]">/</span>
              <span>Infrastructure</span>
            </div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF4D94]/50 to-transparent" />
      </section>

      <div className="mx-auto max-w-6xl px-6 pt-16">
        {/* ================= FEATURES WITH ANIMATION ================= */}
        <section className="py-32">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl font-bold">Engineering for real-world problems.</h2>
            <p className="mt-6 text-slate-500">Purpose-built products and connected software systems, developed around specific needs.</p>
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
            <h2 className="text-4xl font-bold">Different products. One engineering mindset.</h2>
            <p className="mt-6 text-slate-500">Each product has its own purpose, roadmap, and level of readiness.</p>
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
                  Visit ERS <span className="text-pink-500">→</span>
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
                <p className="text-slate-500 mb-8 text-lg">A planned managed-infrastructure offering, beginning with practical application workloads.</p>
                <span className="inline-flex items-center gap-2 font-bold group-hover:gap-4 transition-all">
                  Explore the direction <span className="text-indigo-500">→</span>
                </span>
              </div>
            </motion.a>
            {/* WANKY PROTECT */}
            <motion.div
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-sm transition-all hover:border-[#FF4D94]/30 hover:shadow-xl hover:shadow-pink-500/5"
            >
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-pink-500/5 blur-3xl transition-colors group-hover:bg-pink-500/10" />
              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#D92D78]">
                    Security layer · Planned
                  </div>
                  <ShieldCheck className="h-6 w-6 text-[#D92D78]" />
                </div>
                <h3 className="mb-4 text-3xl font-bold">Wanky Protect</h3>
                <p className="mb-8 text-lg text-slate-500">
                  Our planned security and protection layer for identity,
                  access control, threat detection, and the wider Wanky ecosystem.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-bold transition-all group-hover:gap-4"
                >
                  Discuss security <span className="text-[#D92D78]">→</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= DASHBOARD PREVIEW SECTION ================= */}
        <section className="rounded-[3rem] bg-zinc-900 p-8 md:p-16 text-white overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold">See how a system fits together.</h2>
            <p className="mt-6 text-zinc-400">A product interface concept for exploring operational workflows—not a live production monitor.</p>
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
            <h2 className="text-5xl font-bold tracking-tight">Have a problem worth solving?</h2>
            <p className="mt-6 text-slate-500 text-lg">Tell us what you want to build, improve, or understand.</p>

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
            <span>Software, products &amp; infrastructure</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <span>Building with intention</span>
          </div>
        </div>
      </footer>
    </div>
  );
}