"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import DemoPanel from "@/components/DemoPanel";

/* ================= LOGOS ================= */
const LOGOS = [
  { src: "/logos/paystack.svg", alt: "Paystack" },
  { src: "/logos/flutterwave.svg", alt: "Flutterwave" },
  { src: "/logos/jumia.svg", alt: "Jumia" },
  { src: "/logos/dhl.svg", alt: "DHL" },
  { src: "/logos/uber.svg", alt: "Uber" },
  { src: "/logos/bolt.svg", alt: "Bolt" },
  { src: "/logos/kobo360.svg", alt: "Kobo360" },
];

/* ================= FEATURES ================= */
const FEATURES = [
  {
    title: "Dispatch Engine",
    desc: "Automate assignment, routing, and execution of errands in real time.",
  },
  {
    title: "Telemetry Layer",
    desc: "Track runners, jobs, and movement with live system visibility.",
  },
  {
    title: "Financial Core",
    desc: "Control payouts, escrow, and transaction flow with precision.",
  },
  {
    title: "Admin Control",
    desc: "Operate your entire logistics network from a single dashboard.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#FF4D94] selection:text-white">
      
      {/* ================= HERO ================= */}
      <div className="mx-auto max-w-6xl px-6 py-20 lg:pt-32">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[3rem] border border-slate-100 bg-slate-50/40 px-8 py-20 lg:px-20"
        >
          <div className="max-w-4xl">
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF4D94]">
              <span className="h-2 w-2 rounded-full bg-[#FF4D94] animate-pulse" />
              Private Beta
            </span>

            <h1 className="mt-8 text-6xl font-bold leading-[0.9] tracking-tighter sm:text-7xl lg:text-8xl">
              The Operating System <br />
              for <span className="text-slate-400 italic underline decoration-[#FF4D94]/30">Logistics</span>
            </h1>

            <p className="mt-10 max-w-xl text-lg text-slate-500 leading-relaxed">
              Wanky powers businesses that move in the physical world. 
              Automate operations, unify data, and scale execution from a single system.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-black px-10 py-4 text-sm font-bold text-white hover:bg-zinc-800 transition"
              >
                Book a Demo
              </Link>

              <Link
                href="/platform"
                className="rounded-full border border-slate-200 px-10 py-4 text-sm font-bold hover:bg-slate-50"
              >
                Explore Platform
              </Link>
            </div>
          </div>
        </motion.section>
      </div>

      {/* ================= LOGO STRIP ================= */}
      <section className="py-24 border-y border-slate-50 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">

          <p className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-14">
            Built for teams operating across modern commerce
          </p>

          <div className="relative flex items-center">
            <motion.div
              className="flex gap-20 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 30, repeat: Infinity }}
            >
              {[...LOGOS, ...LOGOS].map((logo, i) => (
                <div key={i} className="opacity-40 hover:opacity-100 transition">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-8 lg:h-10 grayscale hover:grayscale-0 transition"
                  />
                </div>
              ))}
            </motion.div>

            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">

        {/* ================= FEATURES ================= */}
        <section className="py-32">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl font-bold tracking-tight">
              Everything you need to run logistics at scale.
            </h2>
            <p className="mt-6 text-slate-500">
              Modular systems designed to replace fragmented workflows and manual operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-100 transition"
              >
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= DASHBOARD ================= */}
        <section className="rounded-[3rem] bg-zinc-900 p-16 text-white">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold">
              Full operational visibility.
            </h2>
            <p className="mt-6 text-zinc-400">
              Monitor errands, runners, and transactions in real time.
            </p>
          </div>

          {/* ✅ THIS IS THE FIX */}
          <div className="h-[400px] rounded-2xl bg-white/5 border border-white/10 p-4">
            <DemoPanel />
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-32 text-center">
          <h2 className="text-4xl font-bold">
            Start building your logistics system.
          </h2>
          <p className="mt-6 text-slate-500">
            Join the private beta and deploy your first module.
          </p>

          <div className="mt-10">
            <Link
              href="/contact"
              className="rounded-full bg-black px-12 py-5 text-white font-bold hover:bg-zinc-800"
            >
              Apply for Beta
            </Link>
          </div>
        </section>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-100 py-10">
        <div className="mx-auto max-w-6xl px-6 flex justify-between text-sm text-slate-400">
          <span>© 2026 Wanky Infrastructure</span>
          <span>Systems Operational</span>
        </div>
      </footer>
    </div>
  );
}