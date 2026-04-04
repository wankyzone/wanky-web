"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  return (
    <div className="relative mx-auto max-w-6xl px-4 py-24 space-y-32 bg-white text-slate-900 font-sans">
      
      {/* BACKGROUND MESH */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-50/50 blur-[120px]" />
      </div>

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <span className="px-4 py-1.5 rounded-full bg-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Selected Works
        </span>
        <h1 className="text-5xl font-bold tracking-tight lg:text-7xl">
          Architecting <span className="text-slate-400">Efficiency.</span>
        </h1>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          We build the digital nervous systems for businesses that have outgrown spreadsheets.
        </p>
      </motion.section>

      {/* FEATURED PROJECT */}
      <section className="relative">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            <div>
              <h2 className="text-4xl font-bold tracking-tighter uppercase">ERS</h2>
              <p className="text-xl font-medium text-slate-600 mt-2">Errand Runner System</p>
            </div>

            <div className="space-y-4 text-slate-500 leading-relaxed">
              <p>
                <strong className="text-slate-900">The Friction:</strong> Operations were trapped in WhatsApp chats. Scalability was impossible because data lived in people's heads.
              </p>
              <p>
                <strong className="text-slate-900">The Architecture:</strong> A centralized command center handling dispatch, automated payments, and real-time telemetry.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-8">
              <div>
                <p className="text-2xl font-bold text-slate-900">Zero</p>
                <p className="text-sm text-slate-500">Lost Requests</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">100%</p>
                <p className="text-sm text-slate-500">Audit Trail</p>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-block rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-slate-800"
            >
              Request a Workflow Audit
            </Link>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="aspect-video rounded-3xl bg-slate-900 border-[8px] border-slate-50 shadow-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent" />
                <div className="absolute inset-10 border border-white/10 rounded-xl bg-white/5 backdrop-blur-md p-6">
                    <div className="h-4 w-1/3 bg-white/20 rounded mb-4" />
                    <div className="grid grid-cols-3 gap-4">
                        <div className="h-20 bg-white/10 rounded-lg" />
                        <div className="h-20 bg-white/10 rounded-lg" />
                        <div className="h-20 bg-white/10 rounded-lg" />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}