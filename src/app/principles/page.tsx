export default function PrinciplesPage() {
  const principles = [
    { title: "Clarity over complexity", desc: "We prefer simple systems that teams can actually run." },
    { title: "Reliability over hype", desc: "We build for real usage, not demos." },
    { title: "Maintainable by default", desc: "Readable code, sensible architecture, documented handover." },
    { title: "Ship, then iterate", desc: "We deliver value early and improve with intent." },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <section className="rounded-xl2 border border-wanky-border bg-white p-10 shadow-soft">
        <h1 className="text-3xl font-semibold tracking-tight">Principles</h1>
        <p className="mt-3 text-base text-wanky-muted">
          Wanky is built on disciplined execution: calm delivery, durable systems, and clear tradeoffs.
        </p>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {principles.map((p) => (
          <div key={p.title} className="rounded-xl2 border border-wanky-border bg-white p-8 shadow-soft">
            <h2 className="text-lg font-semibold tracking-tight">{p.title}</h2>
            <p className="mt-2 text-sm text-wanky-muted">{p.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
