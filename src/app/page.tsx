export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 space-y-24">

      {/* Hero */}
      <section>
        <h1 className="text-5xl font-semibold mb-6">
          Internal systems and cloud software for modern businesses.
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          We design and build admin dashboards, internal tools, and automation
          systems that help businesses operate better, move faster, and scale.
        </p>
      </section>

      {/* What We Do */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">What we do</h2>
        <p className="text-gray-600 max-w-3xl">
          Wanky builds internal software systems for businesses. We replace
          spreadsheets, manual workflows, and scattered tools with structured
          software that improves visibility, control, and automation.
        </p>
      </section>

      {/* Services */}
      <section>
        <h2 className="text-3xl font-semibold mb-8">Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border p-6">
            <h3 className="font-semibold mb-2">Admin dashboards</h3>
            <p className="text-sm text-gray-600">
              Control panels for operations, roles, approvals, reporting and visibility.
            </p>
          </div>

          <div className="border p-6">
            <h3 className="font-semibold mb-2">Internal tools</h3>
            <p className="text-sm text-gray-600">
              Custom systems for inventory, dispatch, support, finance and workflows.
            </p>
          </div>

          <div className="border p-6">
            <h3 className="font-semibold mb-2">Automation</h3>
            <p className="text-sm text-gray-600">
              Replace manual processes with automation, logs, alerts and integrations.
            </p>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section>
        <h2 className="text-3xl font-semibold mb-6">How we work</h2>
        <div className="grid md:grid-cols-4 gap-6 text-sm text-gray-600">
          <div>
            <h4 className="font-semibold mb-1">Clarity</h4>
            <p>Clear scope and structured system design.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Reliability</h4>
            <p>Systems built for real usage, not demos.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Speed</h4>
            <p>We ship in weeks and iterate with intention.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Durability</h4>
            <p>Maintainable code and long-term systems.</p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">Projects</h2>
        <p className="text-gray-600">
          ERS — Errand Runner Platform (In development)
        </p>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">Contact</h2>
        <p className="text-gray-600">
          hello@wankysoftware.com
        </p>
      </section>

    </div>
  );
}