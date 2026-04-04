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
      <section className="space-y-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-wanky-border bg-white p-10 shadow-sm"
        >
          <p className="text-sm text-wanky-muted">Featured system</p>

          <h2 className="mt-2 text-3xl font-semibold">
            ERS — Errand Runner System
          </h2>

          <p className="mt-4 max-w-2xl text-wanky-muted">
            A full operational platform for managing errands, dispatching runners, tracking jobs,
            and handling payments — designed for real-world logistics operations.
          </p>

          {/* SYSTEM MODULES */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              "Live runner tracking",
              "Admin dashboard",
              "Dispatch system",
              "Payment & payout flow",
              "Real-time notifications",
              "Analytics & reporting",
            ].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border border-wanky-border p-4 text-sm"
              >
                {item}
              </motion.div>
            ))}
          </div>

          {/* VISUAL PREVIEW (FAKE UI BLOCK FOR NOW) */}
          <div className="mt-10 rounded-xl bg-black p-6 text-white">
            <p className="text-sm text-white/70">System preview</p>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="h-32 rounded-lg bg-white/10" />
              <div className="h-32 rounded-lg bg-white/10" />
              <div className="h-32 rounded-lg bg-white/10" />
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/contact"
              className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white
              transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Build something like this
            </Link>
          </div>
        </motion.div>

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