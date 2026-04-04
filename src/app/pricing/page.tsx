"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="relative mx-auto max-w-6xl px-6 py-24 lg:py-32 bg-white text-black font-sans">
      
      {/* HERO */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <span className="px-3 py-1 rounded-full border border-black/10 bg-slate-50 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          Engagement Models
        </span>
        <h1 className="mt-6 text-5xl font-bold tracking-tight lg:text-7xl">
          Investment in <span className="text-slate-400 font-medium">Clarity.</span>
        </h1>
        <p className="mt-8 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          We don't bill by the hour. We price based on the value and efficiency 
          our systems bring to your bottom line.
        </p>
      </motion.section>

      {/* PRICING CARDS */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        
        {/* MODEL 1: FIXED SCOPE */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50/30 space-y-8"
        >
          <div>
            <h3 className="text-2xl font-bold uppercase tracking-tighter">Fixed-Scope Build</h3>
            <p className="text-slate-500 mt-2 text-sm italic">Perfect for defined projects like ERS or Custom Dashboards.</p>
          </div>
          
          <div className="space-y-4">
            {[
              "End-to-end system architecture",
              "UI/UX Design focused on utility",
              "Database & API integration",
              "30 days of post-launch support",
              "Full code ownership"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-black" />
                <p className="text-sm font-medium text-slate-700">{feature}</p>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-200">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Typically starts at</p>
            <p className="text-4xl font-bold tracking-tight">$3,500+</p>
            <Link 
              href="/contact" 
              className="mt-8 block w-full text-center rounded-full bg-black py-4 text-sm font-bold text-white hover:bg-zinc-800 transition-all"
            >
              Get a Custom Quote
            </Link>
          </div>
        </motion.div>

        {/* MODEL 2: FRACTIONAL CTO / PARTNER */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-10 rounded-[2.5rem] bg-zinc-900 text-white space-y-8 shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-2xl font-bold uppercase tracking-tighter">Retainer Partner</h3>
            <p className="text-zinc-400 mt-2 text-sm italic">Continuous optimization for growing operations.</p>
          </div>

          <div className="relative z-10 space-y-4">
            {[
              "Fractional CTO advisory",
              "Ongoing feature development",
              "Priority bug fixes & security",
              "Workflow automation audits",
              "System performance scaling"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                <p className="text-sm font-medium text-zinc-300">{feature}</p>
              </div>
            ))}
          </div>

          <div className="relative z-10 pt-8 border-t border-white/10">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Monthly investment</p>
            <p className="text-4xl font-bold tracking-tight">$1,500<span className="text-lg text-zinc-500 font-normal"> /mo</span></p>
            <Link 
              href="/contact" 
              className="mt-8 block w-full text-center rounded-full bg-white py-4 text-sm font-bold text-black hover:bg-slate-100 transition-all"
            >
              Check Availability
            </Link>
          </div>
          
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -mr-10 -mt-10" />
        </motion.div>

      </div>

      {/* WHY US SECTION */}
      <section className="mt-32 grid md:grid-cols-3 gap-12 border-t border-slate-100 pt-16">
        <div>
          <h4 className="font-bold uppercase text-xs tracking-[0.2em] mb-4">No Hidden Fees</h4>
          <p className="text-sm text-slate-500 leading-relaxed">The price we agree on is the price you pay. No billing for "extra hours" on agreed scopes.</p>
        </div>
        <div>
          <h4 className="font-bold uppercase text-xs tracking-[0.2em] mb-4">You Own the Code</h4>
          <p className="text-sm text-slate-500 leading-relaxed">Unlike SaaS, you own the IP. If we part ways, you take your system with you. No lock-in.</p>
        </div>
        <div>
          <h4 className="font-bold uppercase text-xs tracking-[0.2em] mb-4">Build for ROI</h4>
          <p className="text-sm text-slate-500 leading-relaxed">If we don't believe a tool will save you more money than it costs to build, we won't build it.</p>
        </div>
      </section>
    </div>
  );
}