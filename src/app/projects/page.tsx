"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Zap, BarChart3 } from "lucide-react"; // I recommend adding lucide-react

export default function ProjectsPage() {
  return (
    <div className="relative mx-auto max-w-6xl px-4 py-24 space-y-32 bg-white text-slate-900">
      
      {/* 1. PREMIUM BACKGROUND MESH */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-50/50 blur-[120px]" />
        <div className="absolute top-20 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-50/40 blur-[100px]" />
      </div>

      {/* 2. REFINED HERO */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <span className="px-4 py-1.5 rounded-full bg-slate-100 text-xs font-bold uppercase tracking-widest text-slate-500">
          Selected Works
        </span>
        <h1 className="text-6xl font-bold tracking-tight lg:text-7xl">
          Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">Efficiency.</span>
        </h1>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          We don't just build apps. We build the digital nervous systems for businesses that have outgrown spreadsheets.
        </p>
      </motion.section>

      {/* 3. FEATURED PROJECT — THE "NARRATIVE" APPROACH */}
      <section className="relative">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Context */}
          <div className="lg:col-span-5 space-y-8 sticky top-24">
            <div>
              <h2 className="text-4xl font-bold italic tracking-tighter">ERS</h2>
              <p className="text-xl font-medium text-slate-600 mt-2">Errand Runner System</p>
            </div>

            <div className="space-y-4 text-slate-500 leading-relaxed">
              <p>
                <strong className="text-slate-900">The Friction:</strong> Operations were trapped in WhatsApp chats and verbal updates. Scalability was impossible because data lived in people's heads, not a system.
              </p>
              <p>
                <strong className="text-slate-900">The Architecture:</strong> A centralized command center that handles dispatch, automated payment reconciliation, and real-time runner telemetry.
              </p>
            </div>

            {/* Metrics as "Outcome" */}
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
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-lg active:scale-95"
            >
              Request a Workflow Audit <ArrowUpRight size={18} />
            </Link>
          </div>

          {/* Right Side: Visual Proof */}
          <div className="lg:col-span-7 space-y-6">
            <div className="aspect-video rounded-3xl bg-slate-900 border-[8px] border-slate-100 shadow-2xl overflow-hidden relative group">
                {/* Mockup Placeholder: Replace with a high-res screenshot or a nice SVG pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-10 left-10 right-10 top-10 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm p-6">
                    <div className="h-4 w-1/3 bg-white/20 rounded mb-4" />
                    <div className="grid grid-cols-3 gap-4">
                        <div className="h-20 bg-white/10 rounded-lg" />
                        <div className="h-20 bg-white/10 rounded-lg" />
                        <div className="h-20 bg-white/10 rounded-lg" />
                    </div>
                </div>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 gap-4">
               {[
                 { title: "Dispatch Engine", icon: <Zap size={16} /> },
                 { title: "Security First", icon: <ShieldCheck size={16} /> },
                 { title: "Live Analytics", icon: <BarChart3 size={16} /> },
                 { title: "Auto-Payments", icon: <ArrowUpRight size={16} /> },
               ].map((f) => (
                 <div key={f.title} className="flex items-center gap-3 p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                   <div className="text-slate-900">{f.icon}</div>
                   <span className="text-sm font-medium text-slate-700">{f.title}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE "PROCESS" SECTION (Replaces lack of social proof) */}
      <section className="rounded-[3rem] bg-slate-50 p-12 lg:p-20 border border-slate-100">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight">How we operate.</h2>
          <p className="mt-4 text-slate-500 leading-relaxed">
            Since we build mission-critical systems, we don't guess. We follow a rigorous 3-step 
            deployment cycle for every project.
          </p>
        </div>
        
        <div className="mt-12 grid md:grid-cols-3 gap-8">
            {["Discovery & Mapping", "Stress-Tested Build", "Seamless Migration"].map((step, i) => (
                <div key={step} className="space-y-3">
                    <div className="text-slate-300 font-mono text-xl">0{i+1}</div>
                    <h3 className="font-bold text-lg text-slate-900">{step}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        {i === 0 && "We map your current chaos and identify exactly where revenue is leaking."}
                        {i === 1 && "We build your system with modern tech that handles thousands of requests without breaking."}
                        {i === 2 && "We move your data from spreadsheets to the new system with zero downtime."}
                    </p>
                </div>
            ))}
        </div>
      </section>

    </div>
  );
} 