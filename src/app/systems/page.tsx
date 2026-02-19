import Link from "next/link";

export default function SystemsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <section className="rounded-xl2 border border-wanky-border bg-white p-10 shadow-soft">
        <p className="text-sm font-medium text-wanky-muted">Wanky Systems</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Internal software for businesses that need to run better.
        </h1>
        <p className="mt-4 text-base text-wanky-muted">
          We design and ship production-ready admin dashboards, internal tools, and automation systems that replace
          spreadsheets, manual workflows, and operational chaos.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/pricing"
            className="rounded-xl bg-wanky-pink px-6 py-3 text-sm font-semibold text-white shadow-soft hover:opacity-95"
          >
            View pricing
          </Link>
          <Link
            href="/contact"
            className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-wanky-text shadow-sm ring-1 ring-wanky-border hover:shadow"
          >
            Talk to us
          </Link>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl2 border border-wanky-border bg-white p-8 shadow-soft">
          <h2 className="text-xl font-semibold tracking-tight">What we build</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-wanky-muted">
            <li>Admin dashboards & control panels</li>
            <li>Internal management tools</li>
            <li>Workflow automation</li>
            <li>Analytics & reporting</li>
            <li>Auth, roles & permissions</li>
            <li>Audit logs & operational visibility</li>
          </ul>
        </div>

        <div className="rounded-xl2 border border-wanky-border bg-white p-8 shadow-soft">
          <h2 className="text-xl font-semibold tracking-tight">How it works</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-wanky-muted">
            <li>Discovery — understand workflows and bottlenecks.</li>
            <li>System design — define scope, milestones, and architecture.</li>
            <li>Build & ship — production-ready, tested delivery.</li>
            <li>Handover — docs, deployment support, optional maintenance.</li>
          </ol>
        </div>
      </section>
    </div>
  );
}
