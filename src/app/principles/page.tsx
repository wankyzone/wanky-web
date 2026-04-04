"use client";

import { motion } from "framer-motion";

export default function PrinciplesPage() {
  const principles = [
    { 
      title: "Clarity over Complexity", 
      desc: "If a system is too complex for your team to understand, it’s a liability, not an asset. We build intuitive architectures that reduce mental overhead." 
    },
    { 
      title: "Reliability over Hype", 
      desc: "We don't chase the newest 'shiny' framework unless it's stable. We build with boring, proven tech that works on a Tuesday at 3 AM." 
    },
    { 
      title: "Maintainable by Default", 
      desc: "You own the code. We ensure it's readable, documented, and architected so that any competent engineer can pick it up tomorrow." 
    },
    { 
      title: "Outcome over Output", 
      desc: "Lines of code don't matter; business results do. We focus on the one metric that actually moves the needle for your operations." 
    },
  ];

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-24 lg:py-32 bg-white text-black font-sans">
      
      {/* HEADER SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mb-24"
      >
        <span className="px-3 py-1 rounded-full border border-black/10 bg-slate-50 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          The Manifesto
        </span>
        <h1 className="mt-6 text-5xl font-bold tracking-tight lg:text-7xl">
          Disciplined <span className="text-slate-400 font-medium italic">Execution.</span>
        </h1>
        <p className="mt-8 text-xl text-slate-500 leading-relaxed">
          Wanky is built on a foundation of calm delivery and durable systems. 
          We don't just write code; we solve operational chaos through software.
        </p>
      </motion.section>

      {/* PRINCIPLES GRID */}
      <section className="grid gap-12 md:grid-cols-2 lg:gap-20">
        {principles.map((p, i) => (
          <motion.div 
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative"
          >
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-sm text-slate-300">0{i + 1}</span>
              <h2 className="text-2xl font-bold tracking-tighter uppercase">{p.title}</h2>
            </div>
            <div className="h-px w-full bg-slate-100 group-hover:bg-black transition-colors duration-500 mb-6" />
            <p className="text-slate-500 leading-relaxed">
              {p.desc}
            </p>
          </motion.div>
        ))}
      </section>

      {/* CALL TO ACTION FOOTER */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-40 rounded-[3rem] bg-black p-12 lg:p-20 text-white text-center"
      >
        <h2 className="text-3xl font-bold mb-6 italic">Ready for a better system?</h2>
        <p className="text-zinc-400 max-w-xl mx-auto mb-10 text-sm leading-relaxed">
          If these principles align with how you want to run your business, we should talk. 
          We are currently selecting projects for our next building cycle.
        </p>
        <a 
          href="/contact" 
          className="inline-block rounded-full bg-white px-10 py-4 text-sm font-bold text-black hover:bg-slate-100 transition-transform active:scale-95"
        >
          Let’s Get Started
        </a>
      </motion.section>

    </div>
  );
}