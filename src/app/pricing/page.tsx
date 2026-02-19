import Link from "next/link";

function PriceCard({
  title,
  price,
  items,
}: {
  title: string;
  price: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl2 border border-wanky-border bg-white p-8 shadow-soft">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-3 text-3xl font-semibold tracking-tight">{price}</p>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-wanky-muted">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <section className="rounded-xl2 border border-wanky-border bg-white p-10 shadow-soft">
        <h1 className="text-3xl font-semibold tracking-tight">Pricing</h1>
        <p className="mt-3 text-base text-wanky-muted">
          Clear scope. Clear timeline. Clear cost. We don’t bill hourly — we ship complete internal systems.
        </p>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <PriceCard
          title="Wanky Systems — Build"
          price="₦1.2m – ₦2.5m / $1,500 – $4,000"
          items={[
            "One production-ready internal system or admin dashboard",
            "Auth (users, roles, permissions)",
            "Core workflows + business logic",
            "Basic analytics & reporting",
            "Clean desktop-first UI",
            "Deployment + handover + documentation",
            "Timeline: 3–5 weeks",
            "Payment: 50% upfront, 50% on delivery",
          ]}
        />

        <div className="rounded-xl2 border border-wanky-border bg-gradient-to-b from-wanky-pinkSoft/50 to-white p-8 shadow-soft">
          <h2 className="text-xl font-semibold tracking-tight">Optional add-ons</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-wanky-muted">
            <li>Maintenance & updates: ₦150k / $200 per month</li>
            <li>Additional modules or dashboards</li>
            <li>Advanced analytics</li>
            <li>Priority support</li>
          </ul>

          <div className="mt-8 rounded-xl bg-white p-5 ring-1 ring-wanky-border">
            <p className="text-sm font-semibold">Next step</p>
            <p className="mt-2 text-sm text-wanky-muted">
              If you’re ready to replace manual workflows with real software, let’s talk.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex rounded-xl bg-wanky-pink px-5 py-3 text-sm font-semibold text-white shadow-soft hover:opacity-95"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
