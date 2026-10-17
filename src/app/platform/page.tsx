import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  Database,
  GitBranch,
  MessageSquare,
  Package,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "ERS — Errand Runner System | Wanky Technologies",
  description:
    "ERS is Wanky's logistics marketplace connecting clients who need errands completed with runners who can fulfil them. Built with a focus on Lagos, Nigeria.",
};

const capabilities = [
  {
    number: "01",
    title: "Errand creation",
    description:
      "Clients can describe the task they need completed and submit an errand through the platform.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Runner workflow",
    description:
      "Runners participate in the marketplace, with the operating rule that a runner can handle one active errand at a time.",
    icon: Users,
  },
  {
    number: "03",
    title: "In-app communication",
    description:
      "The product is designed for client–runner communication through in-app chat and audio calling.",
    icon: MessageSquare,
  },
  {
    number: "04",
    title: "Payment and escrow",
    description:
      "The payment flow is designed around holding funds through the errand lifecycle and releasing them according to the applicable completion rules.",
    icon: CreditCard,
  },
];

const architecture = [
  {
    title: "Mobile application",
    detail: "Expo and React Native",
    icon: Package,
  },
  {
    title: "API and business logic",
    detail: "Node.js, Express and TypeScript",
    icon: Workflow,
  },
  {
    title: "Identity and data",
    detail: "Supabase and PostgreSQL",
    icon: Database,
  },
  {
    title: "Payments",
    detail: "Paystack integration planned",
    icon: CreditCard,
  },
];

export default function PlatformPage() {
  return (
    <main className="overflow-hidden bg-white text-zinc-950">
      {/* HERO */}
      <section className="relative border-b border-zinc-100">
        <div className="pointer-events-none absolute -right-40 top-0 h-[480px] w-[480px] rounded-full bg-[#FF4D94]/[0.09] blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-32">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D94]" />
              Wanky flagship product
            </div>

            <h1 className="mt-8 text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              Errands, organised.
              <span className="mt-3 block text-zinc-400">
                Execution, connected.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-zinc-600 sm:text-lg">
              ERS — the Errand Runner System — is a logistics marketplace
              designed to connect people who need errands completed with
              runners who can carry them out. We are building for the practical
              realities of getting things done in Lagos, Nigeria.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="https://ers.wankysoftware.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#D92D78]"
              >
                Visit ERS <ArrowRight size={16} />
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-full border border-zinc-200 px-7 py-4 text-sm font-semibold transition hover:border-black"
              >
                Contact Wanky
              </Link>
            </div>

            <p className="mt-5 max-w-lg text-xs leading-5 text-zinc-400">
              Product availability and individual capabilities may vary while
              release validation and testing continue.
            </p>
          </div>

          {/* CONCEPTUAL WORKFLOW VISUAL */}
          <div className="relative rounded-[2rem] border border-zinc-200 bg-zinc-50 p-5 sm:p-7">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-5">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-[#D92D78]">
                  ERS / WORKFLOW
                </p>
                <h2 className="mt-2 text-lg font-bold">
                  From request to completion
                </h2>
              </div>
              <GitBranch className="text-[#D92D78]" size={22} />
            </div>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-pink-50 p-3 text-[#D92D78]">
                    <ClipboardList size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">01. Client posts an errand</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      The task enters the marketplace workflow.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowDownRight size={19} className="text-[#D92D78]" />
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-zinc-100 p-3 text-zinc-700">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">02. Runner accepts</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      One active errand per runner.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowDownRight size={19} className="text-[#D92D78]" />
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-zinc-100 p-3 text-zinc-700">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">03. Coordinate the task</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      In-app communication supports coordination.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowDownRight size={19} className="text-[#D92D78]" />
              </div>

              <div className="rounded-2xl border border-[#FF4D94]/40 bg-pink-50/70 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-white p-3 text-[#D92D78]">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">04. Complete the errand</p>
                    <p className="mt-1 text-xs text-zinc-600">
                      Completion and payment follow the implemented workflow.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-5 text-[10px] leading-5 text-zinc-400">
              Conceptual product workflow. This diagram is illustrative, not a
              live transaction or operational-status feed.
            </p>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="max-w-2xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D92D78]">
            Product capabilities
          </p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
            Designed around the errand lifecycle.
          </h2>
          <p className="mt-6 leading-7 text-zinc-600">
            ERS brings the key participants and steps of an errand into one
            product. The capabilities below describe the product design;
            individual features remain subject to implementation and release
            verification.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {capabilities.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.number}
                className="rounded-3xl border border-zinc-200 p-7 transition hover:-translate-y-1 hover:border-[#FF4D94]/60 hover:shadow-lg hover:shadow-pink-500/5 sm:p-9"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-2xl bg-pink-50 p-3 text-[#D92D78]">
                    <Icon size={22} />
                  </div>
                  <span className="font-mono text-xs text-zinc-400">
                    {item.number}
                  </span>
                </div>
                <h3 className="mt-7 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 leading-7 text-zinc-600">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="bg-zinc-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 sm:py-32 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF4D94]">
              Engineering foundation
            </p>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
              Built in layers. Developed with intent.
            </h2>
            <p className="mt-6 leading-7 text-zinc-400">
              ERS is being developed with a mobile client, a typed backend,
              managed identity and data services, and supporting infrastructure.
              The architecture is intended to keep product responsibilities
              clear as the marketplace evolves.
            </p>

            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <ShieldCheck className="mt-0.5 shrink-0 text-[#FF4D94]" size={20} />
              <p className="text-sm leading-6 text-zinc-400">
                Security and access controls must be verified in the running
                product. Wanky Protect is the planned shared protection layer
                for the wider Wanky ecosystem.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {architecture.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-5"
                >
                  <div className="rounded-xl bg-[#FF4D94]/10 p-3 text-[#FF4D94]">
                    <Icon size={21} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{item.detail}</p>
                  </div>
                  <span className="font-mono text-xs text-zinc-600">
                    0{index + 1}
                  </span>
                </div>
              );
            })}
            <p className="px-2 pt-2 text-[10px] leading-5 text-zinc-500">
              Architecture overview, not a service-availability guarantee.
              Paystack integration is planned and should not be interpreted as
              confirmation that production payments are active.
            </p>
          </div>
        </div>
      </section>

      {/* NEXT STEPS */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="rounded-[2rem] border border-zinc-200 p-8 sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D92D78]">
              The road ahead
            </p>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Validate the core. Improve from real use.
            </h2>
            <p className="mt-5 leading-7 text-zinc-600">
              The immediate priority is to validate the core marketplace on
              real devices, resolve release issues, and establish a dependable
              foundation before expanding the product scope.
            </p>
          </div>
          <div className="mt-8 flex shrink-0 flex-wrap gap-3 lg:mt-0">
            <a
              href="https://ers.wankysoftware.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#D92D78]"
            >
              Visit ERS <ArrowRight size={16} />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-6 py-4 text-sm font-semibold transition hover:border-black"
            >
              Make an inquiry
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
