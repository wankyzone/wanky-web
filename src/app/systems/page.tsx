"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function SystemsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 space-y-20 bg-gradient-to-b from-white via-gray-50 to-white">

      {/* HERO (OPEN — no box) */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="py-10"
      >
        <p className="text-sm font-medium text-wanky-muted">Wanky Systems</p>

        <h1 className="mt-4 text-5xl font-semibold tracking-tight leading-tight max-w-3xl">
          Internal software systems that help businesses operate with clarity and control.
        </h1>

        <p className="mt-6 max-w-2xl text-base text-wanky-muted">
          We design and build structured internal tools — dashboards, workflows, and automation systems —
          that replace spreadsheets, reduce manual work, and give teams full visibility into operations.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/pricing"
            className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white
            transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
          >
            View pricing
          </Link>

          <Link
            href="/contact"
            className="rounded-full border border-black px-6 py-3 text-sm font-semibold text-black
            transition-all duration-300 hover:-translate-y-1 hover:bg-black hover:text-white hover:shadow-xl active:scale-95"
          >
            Talk to us
          </Link>
        </div>
      </motion.section>

      {/* SYSTEM CAPABILITIES (DARK BLOCK — GOOD) */}
      <section className="rounded-2xl bg-black p-10 text-white">
        <h2 className="text-2xl font-semibold">System capabilities</h2>

        <p className="mt-2 text-sm text-white/70 max-w-xl">
          Every system we build is structured into modular components — giving your business clarity, control, and scalability.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            "Admin Dashboard",
            "Dispatch System",
            "Payments & Payouts",
            "Audit Logs",
            "Automation Engine",
            "Notifications",
          ].map((title, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="group relative rounded-xl border border-white/10 bg-white/5 p-6
              transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-white/10 to-transparent" />

              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-white/70">
                Built as part of a structured, scalable system architecture.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHAT WE BUILD (CARDS — GOOD USE) */}
      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Admin dashboards",
            desc: "Control panels for operations — manage users, workflows, approvals, and system activity.",
          },
          {
            title: "Internal tools",
            desc: "Custom tools tailored to your business — inventory, requests, dispatch, finance, and reporting.",
          },
          {
            title: "Automation",
            desc: "Replace manual processes with structured automation, alerts, and workflows.",
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group relative rounded-xl border border-wanky-border bg-white p-6
            transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-black/5 to-transparent" />

            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-wanky-muted">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* WHO IT'S FOR (OPEN — no box) */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-6"
      >
        <h2 className="text-2xl font-semibold">Who this is for</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {[
            "Businesses running operations via spreadsheets or WhatsApp",
            "Teams needing better visibility and accountability",
            "Founders scaling operations without chaos",
            "Companies transitioning to structured systems",
          ].map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="text-sm text-wanky-muted"
            >
              {text}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* HOW WE WORK (MINIMAL) */}
      <section className="py-6">
        <h2 className="text-2xl font-semibold">How we work</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-4">
          {[
            "Clarity",
            "Reliability",
            "Speed",
            "Durability",
          ].map((title, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <p className="font-semibold">{title}</p>
              <p className="mt-2 text-sm text-wanky-muted">
                Built with strong system thinking and execution.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA (KEEP STRONG) */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="rounded-2xl bg-black p-10 text-center text-white"
      >
        <h2 className="text-2xl font-semibold">
          Need a system for your business?
        </h2>

        <p className="mt-3 text-sm text-white/70">
          Let’s design something structured, scalable, and built for real operations.
        </p>

        <div className="mt-6">
          <Link
            href="/contact"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black
            transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
          >
            Talk to us
          </Link>
        </div>
      </motion.section>

    </div>
  );
}