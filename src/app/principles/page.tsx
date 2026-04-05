"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PrinciplesPage() {
  const principles = [
    { 
      title: "Systems over Features", 
      desc: "Individual features are cheap. Robust, interconnected systems are expensive. We prioritize the architecture that allows your business to scale without breaking." 
    },
    { 
      title: "Reliability over Hype", 
      desc: "We don't chase 'shiny' frameworks. We build with hardened, proven tech that works on a Tuesday at 3 AM when your operations are at peak velocity." 
    },
    { 
      title: "Radical Transparency", 
      desc: "No sugar-coating. If a technical path is a dead end or a sunk-cost fallacy, we call it out immediately. We are partners in execution, not just 'yes' men." 
    },
    { 
      title: "Outcome over Output", 
      desc: "Lines of code are a liability. Business results are the only asset. We focus on the single operational metric that moves the needle for your bottom line." 
    },
  ];

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-24 lg:py-32 bg-white text-black font-sans selection:bg-[#FF4D94] selection:text-white">
      
      {/* 1. HEADER: THE MANIFESTO */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mb-32"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF4D94]">
          Internal Philosophy
        </span>
        <h1 className="mt-8 text-6xl font-bold tracking-tighter lg:text-8xl leading-[0.9]">
          Relentless <br />
          <span className="text-slate-400 italic underline decoration-[#FF4D94]/20">Execution.</span>
        </h1>
        <p className="mt-10 text-xl text-slate-500 leading-relaxed max-w-2xl">
          Wanky is built on the belief that software should be a force multiplier, not a bottleneck. 
          We solve operational chaos through disciplined engineering and brutal honesty.
        </p>
      </motion.section>

      {/* 2. PRINCIPLES GRID (Surgical Pink Accents) */}
      <section className="grid gap-16 md:grid-cols-2 lg:gap-x-24 lg:gap-y-32">
        {principles.map((p, i) => (
          <motion.div 
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative"
          >
            <div className="mb-6 flex items-center gap-4">
              <span className="font-mono text-xs text-[#FF4D94] font-bold tracking-widest">
                PROTOCOL_0{i + 1}
              </span>
              <div className="h-px flex-grow bg-slate-100 group-hover:bg-[#FF4D94]/30 transition-colors duration-500" />
            </div>
            <h2 className="text-2xl font-bold tracking-tighter uppercase mb-6 group-hover:text-[#FF4D94] transition-colors">
              {p.title}
            </h2>
            <p className="text-slate-500 leading-relaxed text-sm lg:text-base">
              {p.desc}
            </p>
          </motion.div>
        ))}
      </section>

      {/* 3. THE FOUNDER'S PROMISE (Deep Black Section) */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-40 rounded-[3rem] bg-zinc-900 p-12 lg:p-24 text-white relative overflow-hidden"
      >
        <div className="relative z-10 max-w-3xl">
            <h2 className="text-4xl font-bold mb-8 italic tracking-tight">Built for the long term.</h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-12">
              We aren't interested in "hustling" for quick wins. We are interested in 
              building the technical backbone for the next generation of logistics 
              giants. If your mission is long-term, our principles align.
            </p>
            <Link 
              href="/contact" 
              className="inline-block rounded-full bg-[#FF4D94] px-12 py-5 text-sm font-bold text-white hover:bg-[#FF4D94]/90 transition-all active:scale-95 shadow-2xl shadow-[#FF4D94]/20"
            >
              Apply for Partnership
            </Link>
        </div>

        {/* Decorative Grid and Glow */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
            <svg width="100%" height="100%"><defs><pattern id="grid-p" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid-p)" /></svg>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF4D94]/10 blur-[120px] rounded-full -mr-20 -mt-20" />
      </motion.section>

    </div>
  );
}