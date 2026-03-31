import Link from "next/link";

export default function SystemsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 space-y-10">
      
      {/* HERO */}
      <section className="rounded-xl2 border border-wanky-border bg-white p-10 shadow-soft">
        <p className="text-sm font-medium text-wanky-muted">Wanky Systems</p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight leading-tight">
          Internal software systems that help businesses operate with clarity and control.
        </h1>

        <p className="mt-4 max-w-2xl text-base text-wanky-muted">
          We design and build structured internal tools — dashboards, workflows, and automation systems —
          that replace spreadsheets, reduce manual work, and give teams full visibility into operations.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/pricing"
            className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white shadow-soft hover:opacity-90 transition"
          >
            View pricing
          </Link>

          <Link
            href="/contact"
            className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-wanky-text ring-1 ring-wanky-border hover:shadow transition"
          >
            Talk to us
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-xs text-wanky-muted">
          <span>Admin dashboards</span>
          <span>Internal tools</span>
          <span>Automation systems</span>
          <span>Cloud-ready builds</span>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Admin dashboards",
            desc: "Control panels for operations — manage users, workflows, approvals, and system activity in one place.",
          },
          {
            title: "Internal tools",
            desc: "Custom tools tailored to your business — inventory, requests, dispatch, finance, and reporting systems.",
          },
          {
            title: "Automation",
            desc: "Replace repetitive manual processes with structured automation, alerts, and system-driven workflows.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl2 border border-wanky-border bg-white p-6 shadow-soft hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-wanky-muted">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* WHO IT'S FOR */}
      <section className="rounded-xl2 border border-wanky-border bg-white p-8 shadow-soft">
        <h2 className="text-2xl font-semibold tracking-tight">Who this is for</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-wanky-muted">
              Businesses currently running operations through spreadsheets, WhatsApp, or disconnected tools.
            </p>
          </div>

          <div>
            <p className="text-sm text-wanky-muted">
              Teams that need better visibility, accountability, and structure across their internal processes.
            </p>
          </div>

          <div>
            <p className="text-sm text-wanky-muted">
              Founders and operators who want systems that scale with growth — not break under pressure.
            </p>
          </div>

          <div>
            <p className="text-sm text-wanky-muted">
              Companies ready to move from manual coordination to real operational infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="rounded-xl2 border border-wanky-border bg-white p-8 shadow-soft">
        <h2 className="text-2xl font-semibold tracking-tight">How we work</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-4">
          {[
            {
              title: "Clarity",
              desc: "We define scope, workflows, and system structure before writing code.",
            },
            {
              title: "Reliability",
              desc: "We build systems for real usage — not demos or surface-level prototypes.",
            },
            {
              title: "Speed",
              desc: "Tight iteration cycles with fast, production-focused delivery.",
            },
            {
              title: "Durability",
              desc: "Maintainable systems designed to scale as your business grows.",
            },
          ].map((item) => (
            <div key={item.title}>
              <p className="font-semibold">{item.title}</p>
              <p className="mt-2 text-sm text-wanky-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-xl2 border border-wanky-border bg-white p-10 shadow-soft text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          Need a system for your business?
        </h2>

        <p className="mt-3 text-sm text-wanky-muted">
          Let’s design something structured, scalable, and built for real operations.
        </p>

        <div className="mt-6">
          <Link
            href="/contact"
            className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white shadow-soft hover:opacity-90 transition"
          >
            Talk to us
          </Link>
        </div>
      </section>

    </div>
  );
}