"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@wankysoftware.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mx-auto max-w-5xl px-6 py-24 lg:py-32 bg-white text-black font-sans selection:bg-[#FF4D94] selection:text-white">
      
      {/* 1. HEADER SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mb-24"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF4D94]">
          Onboarding
        </span>
        <h1 className="mt-6 text-5xl font-bold tracking-tight lg:text-7xl">
          Apply for the <br />
          <span className="text-slate-400 font-medium italic underline decoration-[#FF4D94]/20">Wanky</span> <br />
          Beta.
        </h1>
        <p className="mt-8 text-xl text-slate-500 leading-relaxed">
          We are accepting a limited number of high-stakes businesses for our 
          next implementation cycle. We do not build "apps"—we install operating systems.
        </p>
      </motion.section>

      {/* 2. THE BRIEFING GRID */}
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: The Briefing Instructions */}
        <div className="lg:col-span-7 space-y-10 rounded-[3rem] border border-slate-100 bg-slate-50/50 p-10 lg:p-14">
            <h3 className="text-2xl font-bold tracking-tight uppercase">Briefing Protocol</h3>
            <p className="text-slate-500 leading-relaxed mb-8">
              To save time, we do not require a formal RFP. Instead, please send a short brief 
              answering the following operational questions:
            </p>
            
            <ul className="space-y-8">
              {[
                { label: "The Chaos", desc: "What part of your current workflow is manual, unstable, or scattered across sheets/chats?" },
                { label: "The Data", desc: "Where does your business critical information live today?" },
                { label: "The Outcome", desc: "What is the single operational metric you need to change?" },
                { label: "The Timeline", desc: "When do you need the first core module deployed?" }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-mono text-xs text-[#FF4D94] mt-1">MOD_0{i+1}</span>
                  <div>
                    <p className="font-bold text-base uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
        </div>

        {/* Right: The CTAs and availability */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="rounded-[2.5rem] bg-zinc-900 p-10 text-white shadow-2xl relative overflow-hidden group">
            <h3 className="text-xl font-bold mb-4 uppercase text-[#FF4D94]">The Priority Line</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-10">
              Send your completed brief directly to our engineering core.
            </p>
            
            <button 
                onClick={copyEmail}
                className="group w-full flex items-center justify-center gap-3 rounded-full bg-black py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-zinc-800 active:scale-95 border border-white/5"
            >
                {copied ? "Copied" : "hello@wankysoftware.com"}
                {copied && <span className="text-[#FF4D94] animate-pulse">✓</span>}
            </button>
            
            {/* Subtle Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D94]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>

          <div className="rounded-[2.5rem] border border-slate-100 bg-slate-50 p-8 flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Status: accepting Q2 applications</p>
          </div>
        </div>
      </div>
    </div>
  );
}