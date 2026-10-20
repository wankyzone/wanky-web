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
    "The Wanky Technologies philosophy: understand people, focus on what matters, and make quality visible through dependable software and honest communication.",
};

const principles = [
  {
    number: "01",
    title: "Empathy — understand people",
    description:
      "We build for real people and real problems, not for technology's sake. We seek to understand users' needs, constraints, and expectations before committing to a solution.",
    practice:
      "Identify the user and problem, test assumptions with feedback, and define success before implementation.",
    icon: Eye,
  },
  {
    number: "02",
    title: "Focus — finish what matters",
    description:
      "Time, money, and attention are limited. A promising idea is not automatically a priority. We concentrate on meaningful outcomes and document future ideas until the right time.",
    practice:
      "Keep one clear primary execution priority, define deliverables, and avoid opening major initiatives that undermine current commitments.",
    icon: Target,
  },
  {
    number: "03",
    title: "Excellence — make quality visible",
    description:
      "People experience a product before they can judge its architecture. Design, onboarding, reliability, communication, and support all shape whether we earn trust.",
    practice:
      "Make experiences clear and consistent, handle errors thoughtfully, and ensure product claims match what is actually available.",
    icon: Wrench,
  },
  {
    number: "04",
    title: "Think in systems",
    description:
      "Products, services, data, integrations, and people interact. Good engineering considers the whole system—not just the feature in front of us.",
    practice:
      "Understand dependencies, define boundaries, and build foundations that can evolve without unnecessary complexity.",
    icon: Layers3,
  },
  {
    number: "05",
    title: "Reliability and security by design",
    description:
      "A feature is not finished simply because it compiles or looks impressive. It needs appropriate testing, clear failure handling, responsible data practices, and validation in realistic environments.",
    practice:
      "Test critical workflows, protect data and credentials, apply appropriate access controls, and investigate failures before claiming readiness.",
    icon: LockKeyhole,
  },
  {
    number: "06",
    title: "Progress through evidence",
    description:
      "We learn by building, testing, observing, and improving. Decisions should respond to actual user needs and technical evidence rather than assumptions or pressure to appear busy.",
    practice:
      "Set a clear goal, verify the result, learn from failures, and expand when the foundation is ready.",
    icon: CheckCircle2,
  },
];
const commitments = [
  {
    title: "Understand before building",
    description:
      "Investigate the problem and the people affected before choosing a solution.",
  },
  {
    title: "Finish the important work",
    description:
      "Prioritise dependable delivery over unnecessary expansion and distractions.",
  },
  {
    title: "Be clear about readiness",
    description:
      "Distinguish working capabilities from prototypes, plans, and ideas.",
  },
  {
    title: "Earn trust through evidence",
    description:
      "Let product quality, responsible practices, and honest communication support our claims.",
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
              Wanky Technologies builds software products and the systems behind them.
              Our philosophy is simple: understand people, focus on what matters,
              and make quality visible through dependable products and honest
              communication.
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
              ["01", "Understand people"],
              ["02", "Focus on what matters"],
              ["03", "Make quality visible"],
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
            These principles shape everyday decisions across product development,
            engineering, design, marketing, customer support, and business
            operations—including ERS, Wanky Cloud, Wanky AI, Wanky Protect,
            and future initiatives such as Wanky OS.
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
                Trust comes from understanding users, delivering the important work,
                validating what we build, and communicating clearly. We aim to
                make our product experience reflect those standards as Wanky grows.
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
              We are building an ecosystem of products with distinct purposes and
              evolving roadmaps. We will solve real problems, concentrate on
              meaningful outcomes, and grow on a foundation we understand.
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
