import Link from "next/link";

<div className="p-6 bg-red-500 text-white font-bold">
  Tailwind test banner
</div>

function Card({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl2 border border-wanky-border bg-white p-6 shadow-soft">
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-wanky-muted">{desc}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      {/* Hero */}
      <section className="rounded-xl2 border border-wanky-border bg-gradient-to-b from-wanky-pinkSoft/60 to-white p-10 shadow-soft">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-wanky-muted">Wanky</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Internal systems and cloud software for modern businesses.
          </h1>
          <p className="mt-4 text-base text-wanky-muted">
            We design and ship production-ready admin dashboards, internal tools, and automation systems
            that replace spreadsheets and manual workflows.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-xl bg-wanky-pink px-6 py-3 text-sm font-semibold text-white shadow-soft hover:opacity-95"
            >
              Talk to us
            </Link>
            <Link
              href="/systems"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-wanky-text shadow-sm ring-1 ring-wanky-border hover:shadow"
            >
              See Wanky Systems
            </Link>
          </div>

          <p className="mt-6 text-xs text-wanky-muted">
            Calm execution. Clear scope. Reliable delivery.
          </p>
        </div>
      </section>

      {/* What we do */}
      <section className="mt-12 grid gap-6 md:grid-cols-3">
        <Card
          title="Admin dashboards"
          desc="Control panels that run operations — roles, permissions, workflows, approvals, and visibility."
        />
        <Card
          title="Internal tools"
          desc="Custom systems for your team — inventory, requests, dispatch, support, finance, and reporting."
        />
        <Card
          title="Automation"
          desc="Replace manual processes with reliable automation, logs, audit trails, and alerts."
        />
      </section>

      {/* Proof / Philosophy */}
      <section className="mt-12 rounded-xl2 border border-wanky-border bg-white p-10 shadow-soft">
        <h2 className="text-2xl font-semibold tracking-tight">How we work</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-4">
          <div>
            <p className="text-sm font-semibold">Clarity</p>
            <p className="mt-2 text-sm text-wanky-muted">Fixed scope and a delivery plan you can trust.</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Reliability</p>
            <p className="mt-2 text-sm text-wanky-muted">Systems that survive real usage, not demos.</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Speed</p>
            <p className="mt-2 text-sm text-wanky-muted">Ship in weeks, iterate with intention.</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Durability</p>
            <p className="mt-2 text-sm text-wanky-muted">Maintainable code and documentation.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
