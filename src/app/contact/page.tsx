"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="relative mx-auto max-w-5xl px-6 py-24 lg:py-32 bg-white text-black font-sans">
      
      {/* 1. SECTION HEADER */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl"
      >
        <span className="px-3 py-1 rounded-full border border-black/10 bg-slate-50 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          Inquiry
        </span>
        <h1 className="mt-6 text-5xl font-bold tracking-tight lg:text-7xl">
          Let’s fix your <span className="text-slate-400 font-medium italic">chaos.</span>
        </h1>
        <p className="mt-8 text-lg text-slate-500 leading-relaxed">
          We only take on 2 projects at a time to ensure architectural excellence. 
          Tell us about the systems that are currently slowing you down.
        </p>
      </motion.section>

      {/* 2. CONTACT GRID */}
      <div className="mt-20 grid lg:grid-cols-12 gap-12">
        
        {/* Left: The Briefing Instructions */}
        <div className="lg:col-span-7 space-y-10">
          <div className="group rounded-[2rem] border border-slate-100 bg-slate-50/50 p-10 transition-all hover:border-black/5 hover:bg-white hover:shadow-xl">
            <h3 className="text-xl font-bold mb-4">Direct Briefing</h3>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Skip the back-and-forth. Send a detailed brief to the address below. 
              To help us move fast, please include:
            </p>
            
            <ul className="space-y-6">
              {[
                { label: "The Friction", desc: "What part of your workflow is manual, slow, or broken?" },
                { label: "The Data", desc: "Where does your information live now? (Sheets, WhatsApp, etc.)" },
                { label: "The Outcome", desc: "What does a perfect day look like once this system is live?" },
                { label: "The Budget", desc: "Approximate range so we can propose the right architecture." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-mono text-xs text-slate-300 mt-1">0{i+1}</span>
                  <div>
                    <p className="font-bold text-sm uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Priority Inbox</p>
              <a 
                href="mailto:hello@wankysoftware.com" 
                className="text-2xl font-bold hover:text-slate-600 transition-colors break-all"
              >
                hello@wankysoftware.com
              </a>
            </div>
          </div>
        </div>

        {/* Right: The "Fast Path" Callouts */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-[2rem] bg-black p-10 text-white shadow-2xl">
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center mb-6">
                <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
            </div>
            <h3 className="text-xl font-bold mb-4 italic">The Fast Path</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              "A 2-minute Loom video of your messy spreadsheet is worth 20 emails."
            </p>
            <p className="text-sm text-zinc-300">
              Record a quick walkthrough of your current process and link it in your email. We’ll review it and get back to you within 24 hours.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-100 p-10">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Availability</h3>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <p className="text-sm font-medium">Currently accepting Q2 projects</p>
            </div>
          </div>
        </div>

      </div>

      {/* 3. FOOTER STYLE DECOR */}
      <div className="mt-32 pt-12 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
        <span>Wanky Software 2024</span>
        <span>Lagos / Global</span>
      </div>
    </div>
  );
}