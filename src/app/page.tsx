"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// Helper for the infinite loop
const LOGOS = [
  "Google", "Paystack", "Amazon", "Bukku Mart", 
  "Purple Mall", "Market Square", "Jumia", "DHL", "Kobo360"
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#FF4D94] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <div className="mx-auto max-w-6xl px-6 py-20 lg:pt-32 lg:pb-10">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[3rem] border border-slate-100 bg-slate-50/30 px-8 py-16 lg:px-20 lg:py-24"
        >
          <div className="relative z-10 max-w-4xl">
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF4D94]">
              <span className="h-2 w-2 rounded-full bg-[#FF4D94] animate-pulse" />
              Now in Private Beta
            </span>

            <h1 className="mt-8 text-6xl font-bold leading-[0.9] tracking-tighter text-black sm:text-7xl lg:text-8xl">
              The OS for <br />
              <span className="text-slate-400 italic underline decoration-[#FF4D94]/30">Unstructured</span> <br />
              Logistics.
            </h1>

            <p className="mt-10 max-w-xl text-lg leading-relaxed text-slate-500">
              Wanky is the infrastructure for businesses that move in the physical world. 
              Automate dispatch, scale telemetry, and centralize operations on a single proprietary engine.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-black px-10 py-4 text-sm font-bold text-white transition-all hover:bg-zinc-800 hover:scale-[1.02] active:scale-95 shadow-xl shadow-black/10"
              >
                Book a Demo
              </Link>
              <Link
                href="/platform"
                className="rounded-full border border-slate-200 bg-white px-10 py-4 text-sm font-bold text-black transition-all hover:bg-slate-50"
              >
                Explore Platform
              </Link>
            </div>
          </div>
        </motion.section>
      </div>

      {/* 2. LOGO MARQUEE (The "Google-style" Slider) */}
      <section className="py-20 border-y border-slate-50 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-12">
            Trusted by the next generation of commerce
          </p>
          
          <div className="relative flex">
            <motion.div 
              className="flex gap-16 whitespace-nowrap items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            >
              {[...LOGOS, ...LOGOS].map((logo, i) => (
                <span 
                  key={i} 
                  className="text-2xl lg:text-3xl font-black text-slate-200 hover:text-[#FF4D94] transition-colors cursor-default"
                >
                  {logo}
                </span>
              ))}
            </motion.div>
            {/* Gradient Fades for depth */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        {/* 3. DASHBOARD PREVIEW SECTION */}
        <section className="mt-20 rounded-[3rem] bg-zinc-900 p-12 lg:p-20 text-white relative overflow-hidden">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold tracking-tight">Real-time control, <br/>without leaving the dashboard.</h2>
            <p className="mt-6 text-base text-zinc-400 leading-relaxed">
              The ERS Admin Interface gives you 100% visibility over every errand, runner, and financial node in your network.
            </p>
          </div>

          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            className="aspect-[16/10] rounded-2xl bg-white/5 border border-white/10 p-4 shadow-2xl relative z-10"
          >
            <div className="flex flex-col gap-4 h-full">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <div className="h-5 w-1/4 bg-white/10 rounded-md" />
                    <div className="flex gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500/30" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/30" />
                        <div className="h-3 w-3 rounded-full bg-green-500/30" />
                    </div>
                </div>
                <div className="grid grid-cols-10 gap-4 flex-grow">
                    <div className="col-span-3 h-full bg-white/5 rounded-xl border border-white/5 p-4" />
                    <div className="col-span-7 h-full bg-white/[0.02] rounded-xl border border-white/5 p-4 flex flex-col gap-3" />
                </div>
            </div>
          </motion.div>
          
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF4D94]/20 blur-[120px] rounded-full" />
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />
        </section>

        {/* 4. DEVELOPER / GITHUB SECTION */}
        <section className="mt-40 mb-32 rounded-[3rem] bg-black p-12 lg:p-20 text-white">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-6">Start building in seconds.</h2>
              <p className="text-zinc-400 max-w-xl mb-12 text-sm leading-relaxed">
                The Wanky architecture is modular by default. Integrate our core logic into your 
                stack or kickstart your next logistics project with our pre-built SDK.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/platform"
                  className="rounded-full bg-white px-8 py-3 text-sm font-bold text-black transition-all hover:bg-slate-100"
                >
                  Explore Platform
                </Link>
                <a 
                  href="https://github.com/wankyzone"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/20 bg-black px-8 py-3 text-sm font-bold text-white transition-all hover:bg-white/5"
                >
                  View Documentation
                </a>
              </div>
            </div>

            {/* Mock Code Block */}
            <div className="bg-[#111] rounded-2xl border border-white/10 p-6 font-mono text-xs sm:text-sm shadow-2xl">
              <div className="flex gap-1.5 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                <div className="w-3 h-3 rounded-full bg-green-500/20" />
              </div>
              <p className="text-zinc-500 mb-2">// Initialize Wanky Engine</p>
              <p className="text-white"><span className="text-[#FF4D94]">const</span> wanky = <span className="text-blue-400">new</span> WankyOS(<span className="text-green-400">&apos;pk_prod_x92...&apos;</span>);</p>
              <p className="text-white mt-4"><span className="text-[#FF4D94]">await</span> wanky.<span className="text-blue-400">dispatch</span>({`{`}</p>
              <p className="text-white pl-4">origin: <span className="text-green-400">&quot;Lagos_Mainland&quot;</span>,</p>
              <p className="text-white pl-4">destination: <span className="text-green-400">&quot;Victoria_Island&quot;</span>,</p>
              <p className="text-white pl-4">optimization: <span className="text-green-400">&quot;fastest&quot;</span></p>
              <p className="text-white">{`}`});</p>
              <p className="text-zinc-500 mt-4">// Status: 200 OK - Runner assigned.</p>
            </div>
          </div>
        </section>
      </div>

      {/* 5. SIMPLE STARTUP FOOTER */}
      <footer className="border-t border-slate-100 py-12">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="font-black text-xl tracking-tighter">Wanky.</span>
            <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Systems Operational
            </span>
          </div>
          <p className="text-slate-400 text-xs">© 2026 Wanky Infrastructure. Built for the physical world.</p>
        </div>
      </footer>
    </div>
  );
}