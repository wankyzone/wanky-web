"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function SystemsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 space-y-16 bg-gradient-to-b from-white via-gray-50 to-white">

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="rounded-xl2 border border-wanky-border bg-white p-10 shadow-sm hover:shadow-xl transition-all duration-300"
      >
        <p className="text-sm font-medium text-wanky-muted">Wanky Systems</p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight leading-tight">
          Internal software systems that help businesses operate with clarity and control.
        </h1>

        <p className="mt-4 max-w-2xl text-base text-wanky-muted">
          We design and build structured internal tools — dashboards, workflows, and automation systems —
          that replace spreadsheets, reduce manual work, and give teams full visibility into operations.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/pricing"
            className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm
            transition-all duration-200 hover:scale-105 hover:opacity-90 active:scale-95"
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
      
      <section className="rounded-xl2 border border-wanky-border bg-black p-8 shadow-lg">
  <h2 className="text-2xl font-semibold tracking-tight text-white">
    System capabilities
  </h2>

  <p className="mt-2 text-sm text-white/70 max-w-xl">
    Every system we build is structured into modular components — giving your business clarity, control, and scalability.
  </p>

  <div className="mt-8 grid gap-6 md:grid-cols-3">
    {[
      {
        title: "Admin Dashboard",
        desc: "Central control panel for managing users, workflows, and operations.",
      },
      {
        title: "Dispatch System",
        desc: "Assign, track, and manage tasks or operations in real-time.",
      },
      {
        title: "Payments & Payouts",
        desc: "Track transactions, automate payouts, and manage financial flows.",
      },
      {
        title: "Audit Logs",
        desc: "Full visibility into system actions, changes, and user activity.",
      },
      {
        title: "Automation Engine",
        desc: "Trigger workflows, alerts, and processes without manual input.",
      },
      {
        title: "Notifications",
        desc: "Real-time updates via push, email, or in-app messaging.",
      },
    ].map((item, i) => (
      <motion.div
        key={item.title}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
        viewport={{ once: true }}
        className="group relative rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
      >
        {/* Glow */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

        <h3 className="text-white font-semibold">{item.title}</h3>
        <p className="mt-2 text-sm text-white/70">{item.desc}</p>
      </motion.div>
    ))}
  </div>
</section>
      {/* WHAT WE BUILD */}
      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Admin dashboards",
            desc: "Control panels for operations — manage users, workflows, approvals, and system activity in one place.",
          },
          {
            title: "Internal tools",
            desc: "Custom tools tailored to your business — inventory, requests, dispatch, finance, and reporting systems.",
          },
          {
            title: "Automation",
            desc: "Replace repetitive manual processes with structured automation, alerts, and system-driven workflows.",
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            viewport={{ once: true }}
            className="group relative rounded-xl2 border border-wanky-border bg-white p-6 shadow-sm
            transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl2 opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-br from-black/5 to-transparent" />

            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-wanky-muted">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* WHO IT'S FOR */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-xl2 border border-wanky-border bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300"
      >
        <h2 className="text-2xl font-semibold tracking-tight">Who this is for</h2>

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
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-sm text-wanky-muted"
            >
              {text}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* HOW WE WORK */}
      <section className="rounded-xl2 border border-wanky-border bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300">
        <h2 className="text-2xl font-semibold tracking-tight">How we work</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-4">
          {[
            {
              title: "Clarity",
              desc: "We define scope and structure before writing code.",
            },
            {
              title: "Reliability",
              desc: "Built for real-world usage, not demos.",
            },
            {
              title: "Speed",
              desc: "Fast iteration and delivery cycles.",
            },
            {
              title: "Durability",
              desc: "Systems designed to scale long-term.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="hover:-translate-y-1 transition-all duration-300"
            >
              <p className="font-semibold">{item.title}</p>
              <p className="mt-2 text-sm text-wanky-muted">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="rounded-xl2 border border-wanky-border bg-black p-10 text-center text-white shadow-lg"
      >
        <h2 className="text-2xl font-semibold tracking-tight">
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