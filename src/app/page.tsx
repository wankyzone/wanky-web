export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <section className="rounded-[32px] border border-black/10 bg-white px-6 py-10 shadow-sm sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm font-medium tracking-tight text-black/60">
            Wanky
          </p>

          <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-black sm:text-5xl lg:text-7xl">
            Internal systems and cloud software for modern businesses.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-black/65 sm:text-lg">
            We design and build admin dashboards, internal tools, and automation
            systems that help businesses operate with more clarity, control, and
            speed.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/systems"
              className="inline-flex items-center justify-center rounded-full border border-black px-6 py-3 text-sm font-medium text-black transition hover:-translate-y-0.5 hover:bg-black hover:text-white"
            >
              See Wanky Systems
            </a>

            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-black px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:opacity-90"
            >
              Talk to us
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-black/55">
            <span>Admin dashboards</span>
            <span>Internal tools</span>
            <span>Automation systems</span>
            <span>Cloud-ready builds</span>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        <div className="rounded-[24px] border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md">
          <h3 className="text-xl font-semibold tracking-tight text-black">
            Admin dashboards
          </h3>
          <p className="mt-3 text-sm leading-6 text-black/65">
            Control panels that run operations — roles, permissions, workflows,
            approvals, reporting, and visibility.
          </p>
        </div>

        <div className="rounded-[24px] border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md">
          <h3 className="text-xl font-semibold tracking-tight text-black">
            Internal tools
          </h3>
          <p className="mt-3 text-sm leading-6 text-black/65">
            Custom systems for teams — inventory, requests, dispatch, support,
            finance, and day-to-day operations.
          </p>
        </div>

        <div className="rounded-[24px] border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md">
          <h3 className="text-xl font-semibold tracking-tight text-black">
            Automation
          </h3>
          <p className="mt-3 text-sm leading-6 text-black/65">
            Replace manual processes with reliable automation, alerts, logs,
            integrations, and operational workflows.
          </p>
        </div>
      </section>

      <section className="mt-10 rounded-[32px] border border-black/10 bg-white px-6 py-8 sm:px-10 sm:py-10">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">
            What we do
          </h2>
          <p className="mt-4 text-base leading-7 text-black/65">
            Wanky builds internal software systems for businesses. We replace
            spreadsheets, manual workflows, and scattered operations with
            structured software that improves visibility, accountability, and
            execution.
          </p>
        </div>
      </section>

      <section className="mt-10 rounded-[32px] border border-black/10 bg-white px-6 py-8 sm:px-10 sm:py-10">
        <h2 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">
          How we work
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="text-base font-semibold text-black">Clarity</h4>
            <p className="mt-2 text-sm leading-6 text-black/65">
              Clear scope and a system design you can understand.
            </p>
          </div>

          <div>
            <h4 className="text-base font-semibold text-black">Reliability</h4>
            <p className="mt-2 text-sm leading-6 text-black/65">
              Systems built for real usage, not surface-level demos.
            </p>
          </div>

          <div>
            <h4 className="text-base font-semibold text-black">Speed</h4>
            <p className="mt-2 text-sm leading-6 text-black/65">
              Fast execution, tight iteration loops, and practical delivery.
            </p>
          </div>

          <div>
            <h4 className="text-base font-semibold text-black">Durability</h4>
            <p className="mt-2 text-sm leading-6 text-black/65">
              Maintainable code, long-term thinking, and scalable foundations.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-5 lg:grid-cols-2">
        <div className="rounded-[32px] border border-black/10 bg-white px-6 py-8 sm:px-10">
          <h2 className="text-2xl font-semibold tracking-tight text-black">
            Projects
          </h2>
          <div className="mt-5 rounded-[24px] border border-black/10 bg-black/[0.02] p-5">
            <p className="text-sm font-medium text-black/55">Current build</p>
            <h3 className="mt-2 text-xl font-semibold text-black">
              ERS — Errand Runner Platform
            </h3>
            <p className="mt-3 text-sm leading-6 text-black/65">
              A logistics and errand platform designed to help people get
              same-day physical tasks handled more reliably.
            </p>
          </div>
        </div>

        <div className="rounded-[32px] border border-black/10 bg-white px-6 py-8 sm:px-10">
          <h2 className="text-2xl font-semibold tracking-tight text-black">
            Contact
          </h2>
          <p className="mt-4 text-base leading-7 text-black/65">
            Need an internal dashboard, automation workflow, or software system
            for your business?
          </p>
          <a
            href="mailto:hello@wankysoftware.com"
            className="mt-6 inline-flex rounded-full border border-black px-5 py-3 text-sm font-medium text-black transition hover:-translate-y-0.5 hover:bg-black hover:text-white"
          >
            hello@wankysoftware.com
          </a>
        </div>
      </section>
    </div>
  );
}