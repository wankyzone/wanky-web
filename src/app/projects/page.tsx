"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectsPage() {
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
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-semibold tracking-tight"
        >
          Systems we’ve designed and built
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-wanky-muted max-w-2xl mx-auto"
        >
          Real systems built for real operations — dashboards, workflows, and automation platforms.
        </motion.p>
      </motion.section>

      {/* FEATURED PROJECT — ERS */}
      <section className="space-y-12">

  {/* PROBLEM → SOLUTION */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="rounded-2xl border border-wanky-border bg-white p-10 shadow-sm"
  >
    <p className="text-sm text-wanky-muted">Case study</p>

    <h2 className="mt-2 text-3xl font-semibold">
      ERS — Errand Runner System
    </h2>

    <p className="mt-4 text-wanky-muted max-w-2xl">
      Many logistics and errand businesses operate through WhatsApp, calls, and manual coordination —
      leading to missed requests, poor tracking, and lack of visibility.
    </p>

    <p className="mt-4 text-wanky-muted max-w-2xl">
      ERS was designed as a structured system to centralize operations, automate workflows,
      and give full control over dispatch, payments, and real-time activity.
    </p>

    {/* METRICS STYLE (EVEN IF PLACEHOLDER FOR NOW) */}
    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        { label: "Dispatch visibility", value: "Real-time" },
        { label: "Manual work", value: "Reduced" },
        { label: "System control", value: "Centralized" },
        { label: "Scalability", value: "High" },
      ].map((item, i) => (
        <div key={i}>
          <p className="text-lg font-semibold">{item.value}</p>
          <p className="text-xs text-wanky-muted">{item.label}</p>
        </div>
      ))}
    </div>
  </motion.div>

  {/* SYSTEM MODULES */}
  <div className="grid gap-6 md:grid-cols-3">
    {[
      {
        title: "Admin Dashboard",
        desc: "Control users, jobs, and system activity from a central panel.",
      },
      {
        title: "Dispatch Engine",
        desc: "Assign and track errands in real-time with full visibility.",
      },
      {
        title: "Payments System",
        desc: "Manage transactions, payouts, and financial flows.",
      },
      {
        title: "Real-time Tracking",
        desc: "Live updates for job status and runner activity.",
      },
      {
        title: "Automation",
        desc: "Trigger alerts, updates, and workflows automatically.",
      },
      {
        title: "Analytics",
        desc: "Track performance, earnings, and system usage.",
      },
    ].map((item, i) => (
      <motion.div
        key={item.title}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.08 }}
        viewport={{ once: true }}
        className="group relative rounded-xl border border-wanky-border bg-white p-6
        transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      >
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-black/5 to-transparent" />

        <h3 className="font-semibold">{item.title}</h3>
        <p className="mt-2 text-sm text-wanky-muted">{item.desc}</p>
      </motion.div>
    ))}
  </div>

  {/* VISUAL PREVIEW */}
  <div className="rounded-2xl bg-black p-8 text-white">
    <p className="text-sm text-white/70">System preview</p>

    <div className="mt-6 grid gap-4 md:grid-cols-3">
      <div className="h-36 rounded-lg bg-white/10" />
      <div className="h-36 rounded-lg bg-white/10" />
      <div className="h-36 rounded-lg bg-white/10" />
    </div>
  </div>

  {/* CTA */}
  <div>
    <Link
      href="/contact"
      className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white
      transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      Build a system like this
    </Link>
  </div>

</section>  

      {/* MORE PROJECTS (PLACEHOLDER FOR FUTURE) */}
      <section>
        <h3 className="text-xl font-semibold">More systems coming</h3>

        <p className="mt-2 text-sm text-wanky-muted">
          Additional systems and case studies will be added as we continue building.
        </p>
      </section>

    </div>
  );
}