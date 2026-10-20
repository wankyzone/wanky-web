import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  Mail,
  MessageCircle,
  ShieldCheck,
  Cloud,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Wanky Technologies",
  description:
    "Contact Wanky Technologies about ERS, Wanky Cloud, Wanky Protect, Wanky Classroom, partnerships, and product inquiries.",
};

const inquiryTypes = [
  {
    title: "ERS",
    description: "Errand Runner System and logistics marketplace inquiries.",
    icon: BriefcaseBusiness,
    subject: "ERS Inquiry",
  },
  {
    title: "Wanky Cloud",
    description: "Managed infrastructure direction and technical discussions.",
    icon: Cloud,
    subject: "Wanky Cloud Inquiry",
  },
  {
    title: "Wanky Protect",
    description: "Security, protection, and ecosystem security discussions.",
    icon: ShieldCheck,
    subject: "Wanky Protect Inquiry",
  },
  {
    title: "Wanky Classroom",
    description: "Digital learning product feedback and early interest.",
    icon: GraduationCap,
    subject: "Wanky Classroom Inquiry",
  },
];

const email = "wankyzone@gmail.com";

export default function ContactPage() {
  return (
    <main className="overflow-hidden bg-white text-zinc-950">
      <section className="relative border-b border-zinc-100">
        <div className="pointer-events-none absolute -right-40 -top-20 h-[440px] w-[440px] rounded-full bg-[#FF4D94]/[0.08] blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D94]" />
              Contact Wanky
            </div>
            <h1 className="mt-8 text-5xl font-bold leading-[0.98] tracking-tight sm:text-7xl">
              Good work starts
              <span className="mt-3 block text-zinc-400">with a conversation.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-600">
              Tell us what you are building, what needs to work better, or
              which part of the Wanky ecosystem you want to discuss. A clear
              starting point helps us understand the problem and the next step.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[1fr_0.75fr] lg:gap-20">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D92D78]">
            Choose a topic
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight">
            What would you like to discuss?
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {inquiryTypes.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.title}
                  href={`/interest?product=${item.title === "ERS" ? "ers" : item.title === "Wanky Cloud" ? "wanky-cloud" : item.title === "Wanky Protect" ? "wanky-protect" : "partnership"}`}
                  className="group rounded-3xl border border-zinc-200 p-6 transition hover:-translate-y-1 hover:border-[#FF4D94]/60 hover:shadow-lg hover:shadow-pink-500/5"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-pink-50 p-3 text-[#D92D78]">
                      <Icon size={21} />
                    </div>
                    <ArrowRight size={17} className="text-zinc-400 transition group-hover:translate-x-1 group-hover:text-[#D92D78]" />
                  </div>
                  <h3 className="mt-6 text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    {item.description}
                  </p>
                </a>
              );
            })}
          </div>
        </div>

        <aside className="h-fit rounded-[2rem] bg-zinc-950 p-7 text-white sm:p-9">
          <div className="rounded-xl bg-[#FF4D94]/10 p-3 text-[#FF4D94] w-fit">
            <Mail size={23} />
          </div>
          <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.22em] text-[#FF4D94]">
            Direct contact
          </p>
          <h2 className="mt-3 text-2xl font-bold">Send us a brief.</h2>
          <p className="mt-4 text-sm leading-7 text-zinc-400">
            Include the problem you are trying to solve, who it affects, any
            important constraints, and what a successful outcome would look
            like.
          </p>
          <a
            href="/interest?product=partnership"
            className="mt-8 flex items-center justify-between gap-3 rounded-full border border-white/15 bg-white/[0.04] px-5 py-4 text-sm font-semibold transition hover:border-[#FF4D94]/60 hover:bg-white/[0.08]"
          >
            <span className="break-all">Start a guided inquiry</span>
            <ArrowRight size={17} className="shrink-0 text-[#FF4D94]" />
          </a>
          <p className="mt-4 text-xs leading-5 text-zinc-500">
            This opens your email application. Response times and project
            availability are not guaranteed.
          </p>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-zinc-200 p-8 sm:p-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-pink-50 p-3 text-[#D92D78]">
              <MessageCircle size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Still exploring?</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600">
                Learn more about the products and the principles behind how
                we build them.
              </p>
            </div>
          </div>
          <Link
            href="/principles"
            className="inline-flex shrink-0 items-center gap-3 rounded-full bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#D92D78]"
          >
            Our principles <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
