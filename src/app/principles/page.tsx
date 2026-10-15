import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  Layers3,
  LockKeyhole,
  Target,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Principles — Wanky Technologies",
  description:
    "The engineering principles behind Wanky Technologies: thoughtful systems, reliability, security, clarity, and evidence-led progress.",
};

const principles = [
  {
    number: "01",
    title: "Systems over shortcuts",
    description:
      "We consider how products, services, data, and people fit together. Good engineering accounts for the whole system—not just the feature in front of us.",
    practice:
      "Understand dependencies, define boundaries, and build foundations that can evolve.",
    icon: Layers3,
  },
  {
    number: "02",
    title: "Reliability over hype",
    description:
      "A feature is not finished simply because it compiles or looks impressive. It needs appropriate testing, clear failure handling, and validation in the environment where it will be used.",
    practice:
      "Test critical workflows, investigate failures, and make claims that evidence supports.",
    icon: CheckCircle2,
  },
  {
    number: "03",
    title: "Security by design",
    description:
      "Security belongs in product decisions and engineering workflows from the beginning. It should not be an afterthought added after a system has grown.",
    practice:
      "Apply appropriate access controls, protect credentials, handle data responsibly, and review risks.",
    icon: LockKeyhole,
  },
  {
    number: "04",
    title: "Clarity over complexity",
    description:
      "Technology should make a real problem easier to solve. Unnecessary abstractions, premature expansion, and features without a clear purpose add cost without guaranteeing value.",
    practice:
      "Define the problem, establish priorities, and choose the simplest approach that meets the need.",
    icon: Eye,
  },
  {
    number: "05",
    title: "Progress through evidence",
    description:
      "We learn by building, testing, observing, and improving. Decisions should respond to actual user needs and technical evidence rather than assumptions or pressure to appear busy.",
    practice:
      "Set a clear goal, verify the result, learn from failures, and expand when the foundation is ready.",
    icon: Target,
  },
];

const commitments = [
  {
    title: "Say what is ready",
    description:
      "Distinguish working capabilities from prototypes, plans, and ideas.",
  },
  {
    title: "Respect the problem",
    description:
      "Understand the people and workflows a product is meant to serve.",
  },
  {
    title: "Finish the important work",
    description:
      "Prioritise validation and dependable delivery before unnecessary expansion.",
  },
];

export default function PrinciplesPage() {
  return (
    <main className="overflow-hidden bg-white text-zinc-950">
      {/* MANIFESTO */}
      <section className="relative border-b border-zinc-100">
        <div className="pointer-events-none absolute -right-40 -top-20 h-[480px] w-[480px] rounded-full bg-[#FF4D94]/[0.08] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
              <Wrench size={13} className="text-[#D92D78]" />
              How we work
            </div>

            <h1 className="mt-8 text-5xl font-bold leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl">
              Build with intent.
              <span className="mt-3 block text-zinc-400">
                Deliver with evidence.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-600 sm:text-xl">
              Wanky Technologies builds software products and the systems
              behind them. Our principles guide how we make technical
              decisions, define product scope, approach security, and turn
              ideas into useful, dependable experiences.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/platform"
                className="inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#D92D78]"
              >
                Explore ERS <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-full border border-zinc-200 px-7 py-4 text-sm font-semibold transition hover:border-black"
              >
                Talk to Wanky
              </Link>
            </div>
          </div>

          <div className="mt-16 grid gap-4 border-t border-zinc-200 pt-8 sm:grid-cols-3">
            {[
              ["01", "Think in systems"],
              ["02", "Build responsibly"],
              ["03", "Prove the result"],
            ].map(([number, label]) => (
              <div key={number} className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#D92D78]">
                  {number}
                </span>
                <span className="text-sm font-semibold text-zinc-700">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="max-w-2xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D92D78]">
            The principles
          </p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
            Values expressed through engineering.
          </h2>
          <p className="mt-6 leading-7 text-zinc-600">
            These principles are intended to shape everyday decisions—not
            just describe the company. They apply across our products,
            including ERS, Wanky Protect, Wanky Cloud, and Wanky Classroom.
          </p>
        </div>

        <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2 lg:gap-x-20 lg:gap-y-16">
          {principles.map((principle) => {
            const Icon = principle.icon;

            return (
              <article key={principle.number} className="group">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl border border-zinc-200 p-3 text-[#D92D78] transition-colors group-hover:border-[#FF4D94]/50 group-hover:bg-pink-50">
                    <Icon size={22} strokeWidth={1.7} />
                  </div>
                  <span className="font-mono text-xs font-semibold tracking-widest text-[#D92D78]">
                    PRINCIPLE_{principle.number}
                  </span>
                  <div className="h-px flex-1 bg-zinc-100 transition-colors group-hover:bg-[#FF4D94]/40" />
                </div>

                <h3 className="mt-6 text-2xl font-bold tracking-tight transition-colors group-hover:text-[#D92D78] sm:text-3xl">
                  {principle.title}
                </h3>

                <p className="mt-4 leading-7 text-zinc-600">
                  {principle.description}
                </p>

                <div className="mt-5 rounded-2xl bg-zinc-50 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D92D78]">
                    In practice
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    {principle.practice}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* COMMITMENTS */}
      <section className="bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF4D94]">
                Our commitment
              </p>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
                Earn trust through the work.
              </h2>
              <p className="mt-6 max-w-lg leading-7 text-zinc-400">
                Trust comes from clear expectations, responsible decisions,
                and visible follow-through. We want our products and
                partnerships to reflect those standards as the company grows.
              </p>
            </div>

            <div className="space-y-0">
              {commitments.map((commitment, index) => (
                <div
                  key={commitment.title}
                  className="flex gap-5 border-b border-white/10 py-6 first:pt-0 last:border-b-0"
                >
                  <span className="pt-1 font-mono text-xs text-[#FF4D94]">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">
                      {commitment.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {commitment.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="relative overflow-hidden rounded-[2rem] bg-pink-50 p-8 sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-[#FF4D94]/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D92D78]">
              The long view
            </p>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
              Build what matters. Make it dependable.
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-zinc-600">
              We are building an ecosystem of products with distinct purposes
              and evolving roadmaps. Our responsibility is to solve real
              problems, validate the work, and grow on a foundation we
              understand.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#D92D78]"
            >
              Start a conversation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
