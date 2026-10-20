import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  Layers3,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Wanky Classroom — Digital Learning, Organized",
  description:
    "Wanky Classroom is an upcoming digital classroom platform for teachers and institutions to organize subjects, lessons, assignments, and assessments.",
};

const capabilities = [
  {
    number: "01",
    title: "Subjects and lessons",
    description:
      "Organize subjects, learning materials, and lessons into a clear structure for students and teachers.",
    icon: BookOpen,
  },
  {
    number: "02",
    title: "Assignments",
    description:
      "Give students a clear place to find assigned work, understand instructions, and follow what needs to be completed.",
    icon: Layers3,
  },
  {
    number: "03",
    title: "Assessments",
    description:
      "Build a foundation for quizzes, tests, and structured assessment workflows.",
    icon: ClipboardCheck,
  },
  {
    number: "04",
    title: "Classes and educators",
    description:
      "Bring educators, classes, and learning activities into a more organized digital environment.",
    icon: Users,
  },
];

export default function ClassroomPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="relative overflow-hidden border-b border-slate-100">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-[#FF4D94]/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FF4D94]/20 bg-[#FF4D94]/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#D92D78]">
              <GraduationCap size={15} />
              An upcoming Wanky product
            </div>

            <h1 className="mt-8 max-w-4xl text-5xl font-bold leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl">
              A better way to{" "}
              <span className="text-slate-400">organize learning.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Wanky Classroom is being planned as a digital classroom platform
              for teachers and institutions to bring subjects, lessons,
              assignments, and assessments into one organized learning
              environment.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/interest?product=partnership&goal=Join%20an%20early-access%20or%20feedback%20group&details=Wanky%20Classroom%20early%20access"
                className="inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#FF4D94]"
              >
                Register your interest
                <ArrowRight size={17} />
              </a>
              <a
                href="#vision"
                className="inline-flex items-center rounded-full border border-slate-200 px-7 py-4 text-sm font-semibold transition hover:border-black"
              >
                Explore the vision
              </a>
            </div>

            <p className="mt-5 text-xs text-slate-400">
              Early-stage product concept. Features and availability may change.
            </p>
          </div>
        </div>
      </section>

      <section
        id="vision"
        className="mx-auto max-w-6xl px-6 py-24 sm:py-32"
      >
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D92D78]">
            The product vision
          </p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
            Learning should feel organized, not fragmented.
          </h2>
          <p className="mt-6 leading-7 text-slate-600">
            Classroom learning involves people, materials, tasks, and
            evaluation. Wanky Classroom aims to give these activities a
            coherent digital home, starting with the fundamentals teachers and
            institutions need most.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {capabilities.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.number}
                className="rounded-3xl border border-slate-200 p-7 transition hover:-translate-y-1 hover:border-[#FF4D94]/50 hover:shadow-lg hover:shadow-pink-500/5 sm:p-9"
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
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 sm:pb-32">
        <div className="overflow-hidden rounded-[2rem] bg-zinc-950 p-8 text-white sm:p-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF4D94]">
            Help shape the direction
          </p>
          <h2 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
            Built around the real needs of educators and institutions.
          </h2>
          <p className="mt-5 max-w-xl leading-7 text-zinc-400">
            We want to understand how teachers plan lessons, manage
            assignments, assess students, and organize their classes before
            committing to a wider feature set.
          </p>
          <a
            href="/interest?product=partnership&goal=Ask%20a%20question&details=Wanky%20Classroom%20feedback"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-[#FF4D94]"
          >
            Share your feedback
            <ArrowRight size={17} />
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-12">
        <Link
          href="/"
          className="text-sm font-semibold text-slate-500 transition hover:text-black"
        >
          ← Back to Wanky Technologies
        </Link>
      </div>
    </main>
  );
}
