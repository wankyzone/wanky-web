"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function SystemsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 space-y-16">

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-xl2 border border-wanky-border bg-white p-10 shadow-soft"
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
            className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white shadow-soft hover:scale-105 hover:opacity-90 transition"
          >
            View pricing
          </Link>

          <Link
            href="/contact"
            className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black shadow-soft
            transition-all duration-200
            hover:scale-105 hover:shadow-lg active:scale-95"
          >
            Talk to us 
         </Link>
       </div> 
     </motion.section>  

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
            className="rounded-xl2 border border-wanky-border bg-white p-6 shadow-soft hover:shadow-xl hover:-translate-y-1 transition"
          >
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
        className="rounded-xl2 border border-wanky-border bg-white p-8 shadow-soft"
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
      <section className="rounded-xl2 border border-wanky-border bg-white p-8 shadow-soft">
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
              className="hover:translate-y-[-2px] transition"
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
        className="rounded-xl2 border border-wanky-border bg-black p-10 text-center text-white shadow-soft"
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
            className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black shadow-soft hover:scale-105 transition"
          >
            Talk to us
          </Link>
        </div>
      </motion.section>

    </div>
  );
}