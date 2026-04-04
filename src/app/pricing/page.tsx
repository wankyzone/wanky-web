"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PricingPage() {
  return (
    <div className="relative mx-auto max-w-6xl px-4 py-16 space-y-20 bg-gradient-to-b from-white via-gray-50 to-white">

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-120px] left-1/2 h-[320px] w-[600px] -translate-x-1/2 rounded-full bg-black/5 blur-3xl" />
      </div>

      {/* HERO */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        className="text-center"
      >
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          className="text-5xl font-semibold tracking-tight"
        >
          Pricing for structured business systems
        </motion.h1>

        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="mt-4 text-wanky-muted max-w-2xl mx-auto"
        >
          Choose a plan based on your business stage. Every system is built for real operations — not templates.
        </motion.p>
      </motion.section>

      {/* PRICING CARDS */}
      <section className="grid gap-6 md:grid-cols-3">

        {/* STARTER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-wanky-border bg-white p-8 shadow-sm"
        >
          <h3 className="text-lg font-semibold">Starter</h3>
          <p className="mt-2 text-sm text-wanky-muted">For small businesses getting structured</p>

          <p className="mt-6 text-3xl font-semibold">₦150k – ₦300k</p>

          <ul className="mt-6 space-y-2 text-sm text-wanky-muted">
            <li>Basic admin dashboard</li>
            <li>Simple workflow system</li>
            <li>User management</li>
            <li>Deployment support</li>
          </ul>

          <Link
            href="/contact"
            className="mt-8 block rounded-full bg-black px-6 py-3 text-center text-sm font-semibold text-white
            transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Get started
          </Link>
        </motion.div>

        {/* GROWTH (FEATURED) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl border-2 border-black bg-white p-8 shadow-xl"
        >
          <span className="absolute top-4 right-4 text-xs bg-black text-white px-3 py-1 rounded-full">
            Most popular
          </span>

          <h3 className="text-lg font-semibold">Growth</h3>
          <p className="mt-2 text-sm text-wanky-muted">For growing businesses scaling operations</p>

          <p className="mt-6 text-3xl font-semibold">₦400k – ₦800k</p>

          <ul className="mt-6 space-y-2 text-sm text-wanky-muted">
            <li>Advanced dashboards</li>
            <li>Automation workflows</li>
            <li>Analytics & reporting</li>
            <li>Role-based access</li>
            <li>API integrations</li>
          </ul>

          <Link
            href="/contact"
            className="mt-8 block rounded-full bg-black px-6 py-3 text-center text-sm font-semibold text-white
            transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            Start building
          </Link>
        </motion.div>

        {/* SCALE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-wanky-border bg-white p-8 shadow-sm"
        >
          <h3 className="text-lg font-semibold">Scale</h3>
          <p className="mt-2 text-sm text-wanky-muted">For companies needing full systems</p>

          <p className="mt-6 text-3xl font-semibold">₦1M+</p>

          <ul className="mt-6 space-y-2 text-sm text-wanky-muted">
            <li>Full system architecture</li>
            <li>Custom workflows</li>
            <li>Real-time features</li>
            <li>Advanced integrations</li>
            <li>Ongoing support</li>
          </ul>

          <Link
            href="/contact"
            className="mt-8 block rounded-full border border-black px-6 py-3 text-center text-sm font-semibold text-black
            transition-all duration-300 hover:bg-black hover:text-white"
          >
            Contact us
          </Link>
        </motion.div>

      </section>

      {/* CTA */}
      <section className="rounded-2xl bg-black p-10 text-center text-white">
        <h2 className="text-2xl font-semibold">
          Not sure which plan fits?
        </h2>

        <p className="mt-3 text-sm text-white/70">
          We’ll help you define the right system based on your business needs.
        </p>

        <div className="mt-6">
          <Link
            href="/contact"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black
            transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Talk to us
          </Link>
        </div>
      </section>

    </div>
  );
}