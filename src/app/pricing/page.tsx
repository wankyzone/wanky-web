import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  BriefcaseBusiness,
  MessageSquareText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Engagements — Wanky Technologies",
  description:
    "Explore how to discuss product development, operational systems, and infrastructure projects with Wanky Technologies.",
};

const engagements = [
  {
    number: "01",
    title: "Product discovery",
    description:
      "For teams that need to clarify a problem, identify users, and define the smallest useful solution before committing to development.",
    icon: MessageSquareText,
    points: [
      "Problem and workflow review",
      "Initial scope and priorities",
      "Proposed next steps",
    ],
  },
  {
    number: "02",
    title: "Product development",
    description:
      "For projects with a defined goal that need an implementation plan, technical decisions, and a realistic delivery scope.",
    icon: Blocks,
    points: [
      "Requirements and technical review",
      "Scope and milestone discussion",
      "Project-specific proposal",
    ],
  },
  {
    number: "03",
    title: "Infrastructure planning",
    description:
      "For teams evaluating deployment, managed services, integrations, and the operational requirements of their applications.",
    icon: BriefcaseBusiness,
    points: [
      "Current architecture review",
      "Infrastructure requirements",
      "Cost and trade-off discussion",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center sm:py-32">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D92D78]">
            Engagements
          </p>
          <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-bold leading-tight tracking-tight sm:text-7xl">
            Clear scope.{" "}
            <span className="text-slate-400">Thoughtful execution.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-600">
            Every project has different requirements. We start by understanding
            the problem, the people affected, and the outcome you need before
            discussing scope, delivery, and cost.
          </p>
          <a
            href="/interest?product=software-services"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#FF4D94]"
          >
            Discuss a project <ArrowRight size={17} />
          </a>
          <p className="mt-5 text-xs text-slate-400">
            Pricing is project-specific. No fixed rates or service availability
            are implied on this page.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D92D78]">
            Ways to work together
          </p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
            Start with the problem, not a package.
          </h2>
          <p className="mt-6 leading-7 text-slate-600">
            These are starting points for a conversation, not preconfigured
            plans. We will confirm fit, deliverables, timeline, dependencies,
            and commercial terms before any work begins.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {engagements.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.number}
                className="flex flex-col rounded-3xl border border-slate-200 p-7 transition hover:-translate-y-1 hover:border-[#FF4D94]/50 hover:shadow-lg hover:shadow-pink-500/5 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-2xl bg-slate-50 p-3 text-[#D92D78]">
                    <Icon size={23} />
                  </div>
                  <span className="font-mono text-xs text-slate-400">
                    {item.number}
                  </span>
                </div>
                <h3 className="mt-7 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {item.description}
                </p>
                <ul className="mt-7 space-y-3 border-t border-slate-100 pt-6">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm text-slate-600"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF4D94]" />
                      {point}
                    </li>
                  ))}
                </ul>
                <a
                  href={`/interest?product=software-services&goal=${encodeURIComponent("Discuss a project or service")}&details=${encodeURIComponent(item.title)}`}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold transition hover:text-[#D92D78]"
                >
                  Discuss this option <ArrowRight size={16} />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-[2rem] bg-zinc-950 p-8 text-white sm:p-12">
          <h2 className="text-3xl font-bold tracking-tight">
            What happens after you inquire?
          </h2>
          <ol className="mt-8 grid gap-8 sm:grid-cols-3">
            <li>
              <p className="text-xs font-bold uppercase tracking-widest text-[#FF4D94]">
                Step 01
              </p>
              <h3 className="mt-3 font-semibold">Share the problem</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Explain what you are trying to build or improve.
              </p>
            </li>
            <li>
              <p className="text-xs font-bold uppercase tracking-widest text-[#FF4D94]">
                Step 02
              </p>
              <h3 className="mt-3 font-semibold">Review the fit</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Discuss requirements, constraints, and feasibility.
              </p>
            </li>
            <li>
              <p className="text-xs font-bold uppercase tracking-widest text-[#FF4D94]">
                Step 03
              </p>
              <h3 className="mt-3 font-semibold">Agree on scope</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Confirm deliverables, timeline, and cost before proceeding.
              </p>
            </li>
          </ol>
          <Link
            href="/interest?product=software-services"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-[#FF4D94]"
          >
            Contact Wanky <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
