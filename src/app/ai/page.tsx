import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cpu, Network, Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "Wanky AI — AI Engineering | Wanky Technologies",
  description:
    "Wanky AI is the AI engineering division of Wanky Technologies Ltd, focused on intelligent software, AI agents, automation, and a long-term direction in robotics.",
};

const focusAreas = [
  {
    number: "01",
    title: "AI software and agents",
    status: "Planned focus",
    description:
      "Explore intelligent applications, AI-powered software, task-oriented assistants and agents, and workflow automation for real-world problems.",
    icon: Workflow,
  },
  {
    number: "02",
    title: "AI engineering",
    status: "Planned focus",
    description:
      "Build engineering capability around model integration, inference, evaluation, and the deployment infrastructure needed to operate AI features responsibly.",
    icon: Cpu,
  },
  {
    number: "03",
    title: "Physical AI and robotics",
    status: "Long-term direction",
    description:
      "Explore simulation, perception, robotics software, and interaction with the physical world as a longer-term engineering direction.",
    icon: Network,
  },
];

export default function WankyAIPage() {
  return (
    <main className="overflow-hidden bg-white text-zinc-950">
      <section className="relative border-b border-zinc-100 bg-zinc-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,77,148,0.16),transparent_48%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D94]" />
            An AI engineering division of Wanky Technologies Ltd
          </p>
          <h1 className="mt-8 max-w-4xl text-5xl font-bold leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl">
            Wanky AI
            <span className="mt-3 block text-zinc-400">Intelligence, engineered for the real world.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
            Our mission is to engineer intelligent software, AI agents,
            automation systems, and robotics technologies that solve real-world
            problems.
          </p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#FF4D94]">
            Developing direction · capabilities are not yet announced as available
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D92D78]">
            Engineering focus
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Three connected areas. One real-world mandate.
          </h2>
          <p className="mt-6 leading-7 text-zinc-600">
            Wanky AI is a developing division, not a separate company or a
            catalogue of launched products. These focus areas describe the
            direction of the work; no model, integration, robotics system, or
            AI service is represented as operational here.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {focusAreas.map((area) => {
            const Icon = area.icon;

            return (
              <article
                key={area.number}
                className="rounded-2xl border border-zinc-200 p-7 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-xl bg-pink-50 p-3 text-[#D92D78]">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <span className="font-mono text-xs text-zinc-400">
                    {area.number}
                  </span>
                </div>
                <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D92D78]">
                  {area.status}
                </p>
                <h3 className="mt-2 text-xl font-bold">{area.title}</h3>
                <p className="mt-3 leading-7 text-zinc-600">
                  {area.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D92D78]">
              Physical AI · long-term direction
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Software that can meet the physical world.
            </h2>
          </div>
          <div>
            <p className="leading-7 text-zinc-600">
              Robotics is a major long-term direction for Wanky AI. Technologies
              to explore may include NVIDIA Isaac Sim, Isaac ROS, and ROS 2 for
              simulation, perception, and robotics software. These are areas for
              evaluation only: this page does not claim an official partnership,
              certification, or existing integration.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="flex flex-col gap-6 rounded-2xl bg-zinc-950 p-8 text-white sm:p-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF4D94]">
              For project inquiries
            </p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Have a real-world problem to explore?
            </h2>
            <p className="mt-3 leading-7 text-zinc-400">
              Contact Wanky Technologies to discuss the problem and whether it
              fits this developing direction.
            </p>
          </div>
          <Link
            href="/interest?product=wanky-ai"
            className="inline-flex shrink-0 items-center gap-3 rounded-md bg-[#FF4D94] px-6 py-4 text-sm font-semibold text-black transition hover:bg-white"
          >
            Contact Wanky <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}