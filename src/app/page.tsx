"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import DemoPanel from "@/components/DemoPanel";

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

/* ================= LOGOS ================= */
const LOGOS = [
  "https://logo.clearbit.com/flutterwave.com",
  "https://logo.clearbit.com/dhl.com",
  "https://logo.clearbit.com/uber.com",
  "https://logo.clearbit.com/doordash.com",
  "https://logo.clearbit.com/stripe.com",
  "https://logo.clearbit.com/shopify.com",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">

      {/* ================= HERO ================= */}
      <div className="mx-auto max-w-6xl px-6 py-20 lg:pt-32">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[3rem] border border-slate-100 bg-slate-50/40 px-8 py-20 lg:px-20"
        >
          <div className="max-w-4xl">
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-pink-500">
              <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
              Private Beta
            </span>

            <h1 className="mt-8 text-6xl font-bold leading-[0.9] tracking-tighter sm:text-7xl lg:text-8xl">
              The Operating System <br />
              for <span className="text-slate-400 italic underline decoration-pink-500/30">Logistics</span>
            </h1>

            <p className="mt-10 max-w-xl text-lg text-slate-500">
              Wanky powers businesses that move in the physical world.
              Automate operations, unify data, and scale execution from a single system.
            </p>

            <div className="mt-12 flex gap-4">
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
      <section className="py-28 border-y border-slate-100 overflow-hidden bg-white">
        <div className="mx-auto max-w-6xl px-6">

          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400 mb-16">
            Built for teams operating across modern commerce
          </p>

          <div className="relative">

            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

            <motion.div
              className="flex w-max gap-24"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 40, repeat: Infinity }}
            >
              {[...LOGOS, ...LOGOS].map((src, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center min-w-[160px]"
                >
                  <img
                    src={src}
                    alt="logo"
                    className="h-12 object-contain opacity-80 hover:opacity-100 transition duration-300"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">

        {/* ================= FEATURES ================= */}
        <section className="py-32">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl font-bold">
              Everything you need to run logistics at scale.
            </h2>
            <p className="mt-6 text-slate-500">
              Modular systems designed to replace fragmented workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition"
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

          <div className="h-[420px] rounded-2xl bg-white/5 border border-white/10 overflow-hidden p-4">
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