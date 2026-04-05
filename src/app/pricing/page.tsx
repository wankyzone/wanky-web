"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PricingPage() {
  const tiers = [
    {
      name: "Pilot",
      price: "Custom",
      desc: "For startups validating a core operational hook.",
      features: [
        "Single Core Module Deployment",
        "Standard Admin Dashboard",
        "Essential Data Telemetry",
        "4-Week Rapid Build Cycle",
      ],
      button: "Start Pilot",
      featured: false,
    },
    {
      name: "Scale",
      price: "Enterprise",
      desc: "Full infrastructure for high-velocity operations.",
      features: [
        "Full Platform Ecosystem (ERS Style)",
        "Advanced Dispatch Logic",
        "Automated Payout & Ledger Layer",
        "Priority Architecture Support",
      ],
      button: "Get Started",
      featured: true,
    },
    {
      name: "Infrastructure",
      price: "Strategic",
      desc: "For established firms requiring deep integration.",
      features: [
        "Custom Protocol Development",
        "Multi-Tenant API Architecture",
        "Legacy System Migration",
        "Long-term Execution Partner",
      ],
      button: "Inquire",
      featured: false,
    },
  ];

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-24 lg:py-32 bg-white text-black font-sans selection:bg-[#FF4D94] selection:text-white">
      
      {/* 1. PRICING HERO */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF4D94]">
          Engagement Models
        </span>
        <h1 className="mt-6 text-5xl font-bold tracking-tighter lg:text-7xl">
          Investment in <br />
          <span className="text-slate-400 italic">Infrastructure.</span>
        </h1>
        <p className="mt-8 text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
          We don't bill by the hour. We price based on the operational leverage 
          and long-term value our systems bring to your business.
        </p>
      </motion.section>

      {/* 2. THE TIERS */}
      <section className="grid gap-8 lg:grid-cols-3 items-start">
        {tiers.map((tier, i) => (
          <motion.div 
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-[2.5rem] p-10 border transition-all duration-500 ${
              tier.featured 
                ? "bg-zinc-900 text-white border-zinc-800 shadow-2xl scale-[1.05] z-10" 
                : "bg-slate-50/50 border-slate-100 text-black hover:border-[#FF4D94]/20"
            }`}
          >
            {tier.featured && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#FF4D94] px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                Most Scalable
              </span>
            )}
            
            <h3 className={`text-sm font-bold uppercase tracking-widest mb-2 ${tier.featured ? "text-[#FF4D94]" : "text-slate-400"}`}>
              {tier.name}
            </h3>
            <p className="text-3xl font-bold tracking-tighter mb-4">{tier.price}</p>
            <p className={`text-xs leading-relaxed mb-8 ${tier.featured ? "text-zinc-400" : "text-slate-500"}`}>
              {tier.desc}
            </p>

            <ul className="space-y-4 mb-10">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-[11px] font-medium tracking-tight">
                  <div className={`mt-1 h-1.5 w-1.5 rounded-full shrink-0 ${tier.featured ? "bg-[#FF4D94]" : "bg-black"}`} />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className={`block w-full rounded-full py-4 text-center text-xs font-bold uppercase tracking-widest transition-all ${
                tier.featured 
                  ? "bg-[#FF4D94] text-white hover:bg-[#FF4D94]/90" 
                  : "bg-black text-white hover:bg-zinc-800"
              }`}
            >
              {tier.button}
            </Link>
          </motion.div>
        ))}
      </section>

      {/* 3. THE "WHY" SECTION */}
      <section className="mt-40 grid lg:grid-cols-2 gap-16 items-center border-t border-slate-100 pt-20">
        <div>
            <h2 className="text-3xl font-bold tracking-tight uppercase italic mb-6">Build Once. <br/>Scale Forever.</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
                We believe in the Bezos philosophy of "Relentless Execution". 
                When you invest in a Wanky system, you aren't buying a temporary fix; 
                you're installing a permanent asset that depreciates your manual overhead 
                to near zero.
            </p>
        </div>
        <div className="p-10 rounded-3xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-xs uppercase tracking-widest mb-4">Included in every tier</h4>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                {["Cloud Hosting", "Source Code Access", "24/7 Monitoring", "Technical Docs"].map((item) => (
                    <div key={item} className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter flex items-center gap-2">
                        <div className="h-1 w-1 bg-[#FF4D94] rounded-full" />
                        {item}
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}