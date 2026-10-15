import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Cloud,
  Database,
  GitBranch,
  LockKeyhole,
  Server,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Wanky Cloud — Managed Infrastructure",
  description:
    "Wanky Cloud is being developed around managed infrastructure, deployment workflows, storage, and reliable backend services, beginning with the needs of Wanky products.",
};

const capabilities = [
  {
    title: "Compute and deployment",
    description:
      "A foundation for deploying and operating application services with clear environments and repeatable workflows.",
    icon: Server,
    status: "Planned capability",
  },
  {
    title: "Storage and databases",
    description:
      "A practical approach to application data, file storage, backups, and the services that depend on them.",
    icon: Database,
    status: "Planned capability",
  },
  {
    title: "Automation and workflows",
    description:
      "Reduce repetitive operational work through documented deployment and maintenance processes.",
    icon: Workflow,
    status: "Planned capability",
  },
  {
    title: "Security and access",
    description:
      "Build around least-privilege access, protected credentials, and appropriate operational controls.",
    icon: LockKeyhole,
    status: "Design principle",
  },
];

export default function SystemsPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="relative overflow-hidden border-b border-slate-100">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#FF4D94]/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              <Cloud size={15} className="text-[#D92D78]" />
              Wanky Cloud
            </div>

            <h1 className="mt-8 text-5xl font-bold leading-[0.98] tracking-tight sm:text-7xl">
              Infrastructure built around{" "}
              <span className="text-slate-400">real workloads.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Wanky Cloud is our planned managed-infrastructure offering. We
              are approaching it from the practical needs of building,
              deploying, and operating Wanky products—not from the idea of
              recreating every layer of cloud infrastructure ourselves.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="mailto:wankyzone@gmail.com?subject=Wanky%20Cloud%20Inquiry"
                className="inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#FF4D94]"
              >
                Discuss infrastructure needs
                <ArrowRight size={17} />
              </a>
              <Link
                href="/principles"
                className="inline-flex items-center rounded-full border border-slate-200 px-7 py-4 text-sm font-semibold transition hover:border-black"
              >
                Our engineering principles
              </Link>
            </div>

            <p className="mt-5 text-xs leading-5 text-slate-400">
              Wanky Cloud is under development. The capabilities below describe
              the direction of the product, not a list of currently available
              or guaranteed services.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D92D78]">
            The infrastructure approach
          </p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
            Use proven foundations. Solve the right problems.
          </h2>
          <p className="mt-6 leading-7 text-slate-600">
            Our initial direction is to combine established cloud services
            and deployment tools into an operational foundation that can
            support real applications. We intend to learn from the needs of
            ERS before expanding the scope.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {capabilities.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200 p-7 transition hover:-translate-y-1 hover:border-[#FF4D94]/50 hover:shadow-lg hover:shadow-pink-500/5 sm:p-9"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-2xl bg-slate-50 p-3 text-[#D92D78]">
                    <Icon size={23} />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    {item.status}
                  </span>
                </div>
                <h3 className="mt-7 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 sm:pb-32">
        <div className="grid gap-10 rounded-[2rem] bg-zinc-950 p-8 text-white sm:p-14 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="flex items-center gap-3 text-[#FF4D94]">
              <GitBranch size={20} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">
                ERS-first development
              </span>
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Start with a workload we understand.
            </h2>
          </div>
          <div>
            <p className="leading-7 text-zinc-400">
              ERS gives us a concrete context for evaluating deployment,
              application services, data management, observability, and
              operational cost. We can validate what is useful before
              offering infrastructure capabilities to other customers.
            </p>
            <a
              href="mailto:wankyzone@gmail.com?subject=Wanky%20Cloud%20Feedback"
              className="mt-7 inline-flex items-center gap-3 text-sm font-semibold text-white transition hover:text-[#FF4D94]"
            >
              Contact the team <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
