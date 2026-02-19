export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <section className="rounded-xl2 border border-wanky-border bg-white p-10 shadow-soft">
        <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
        <p className="mt-3 text-base text-wanky-muted">
          Tell us what you’re building and what’s currently broken. We’ll respond with next steps.
        </p>

        <div className="mt-8 space-y-4">
          <div className="rounded-xl border border-wanky-border bg-wanky-bg p-4">
            <p className="text-sm font-semibold">Email</p>
            <p className="mt-1 text-sm text-wanky-muted">
              hello@wanky.dev (replace with your real inbox once domain is connected)
            </p>
          </div>

          <div className="rounded-xl border border-wanky-border bg-wanky-bg p-4">
            <p className="text-sm font-semibold">What to include</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-wanky-muted">
              <li>Business name + what you do</li>
              <li>Current workflow (what’s manual / painful)</li>
              <li>What “success” looks like</li>
              <li>Timeline and budget range</li>
            </ul>
          </div>

          <div className="rounded-xl border border-wanky-border bg-white p-4 ring-1 ring-wanky-border">
            <p className="text-sm font-semibold">Fast path</p>
            <p className="mt-2 text-sm text-wanky-muted">
              If you want speed, send a short Loom video showing the workflow you want to fix.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
