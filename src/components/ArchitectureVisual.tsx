import {
  Activity,
  ArrowDown,
  Boxes,
  Cloud,
  Code2,
  Database,
  GraduationCap,
  LockKeyhole,
  Network,
  Package,
  ShieldCheck,
  Workflow,
} from "lucide-react";

const layers = [
  {
    number: "01",
    label: "APPLICATION LAYER",
    items: [
      { name: "ERS", detail: "Logistics", icon: Package },
      { name: "Classroom", detail: "Planned product", icon: GraduationCap },
      { name: "Cloud", detail: "Infrastructure", icon: Cloud },
    ],
  },
  {
    number: "02",
    label: "APPLICATION SERVICES",
    items: [
      { name: "API", detail: "Service interface", icon: Network },
      { name: "Identity", detail: "Access control", icon: LockKeyhole },
      { name: "Workers", detail: "Background jobs", icon: Workflow },
    ],
  },
  {
    number: "03",
    label: "DATA & INTEGRATIONS",
    items: [
      { name: "Database", detail: "Persistent data", icon: Database },
      { name: "Queues", detail: "Async processing", icon: Boxes },
      { name: "External APIs", detail: "Connected services", icon: Code2 },
    ],
  },
];

export default function ArchitectureVisual() {
  return (
    <section
      aria-label="Conceptual Wanky software architecture"
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#09090B] p-5 text-white shadow-2xl shadow-pink-950/10 sm:p-7"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#FF4D94]/10 blur-3xl" />

      <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
        <div>
          <p className="font-mono text-[10px] tracking-[0.22em] text-[#FF4D94]">
            WANKY / SYSTEMS
          </p>
          <h2 className="mt-2 text-lg font-semibold tracking-tight">
            A connected product ecosystem
          </h2>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-zinc-400">
          <Activity size={12} />
          Architecture concept
        </span>
      </div>

      <div className="relative mt-5 space-y-3">
        {layers.map((layer, index) => (
          <div key={layer.number}>
            <div className="mb-2 flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#FF4D94]">
                {layer.number}
              </span>
              <span className="text-[9px] font-semibold tracking-[0.17em] text-zinc-500">
                {layer.label}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {layer.items.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.name}
                    className="min-w-0 rounded-xl border border-white/10 bg-white/[0.035] p-3 transition-colors hover:border-[#FF4D94]/40 hover:bg-white/[0.06] sm:p-4"
                  >
                    <Icon
                      size={17}
                      strokeWidth={1.6}
                      className="mb-3 text-[#FF4D94]"
                    />
                    <p className="truncate text-xs font-semibold text-zinc-100 sm:text-sm">
                      {item.name}
                    </p>
                    <p className="mt-1 text-[9px] leading-4 text-zinc-500 sm:text-[10px]">
                      {item.detail}
                    </p>
                  </div>
                );
              })}
            </div>

            {index < layers.length - 1 && (
              <div className="flex h-8 items-center justify-center">
                <div className="h-full w-px bg-gradient-to-b from-[#FF4D94]/60 to-white/10" />
                <ArrowDown
                  size={12}
                  className="-ml-[7px] mt-5 shrink-0 text-[#FF4D94]"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="relative mt-5 rounded-xl border border-[#FF4D94]/40 bg-[#FF4D94]/[0.07] p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-[#FF4D94]/10 p-2">
            <ShieldCheck size={22} className="text-[#FF4D94]" />
          </div>

          <div className="min-w-0">
            <p className="font-mono text-[10px] tracking-[0.18em] text-[#FF4D94]">
              SHARED SECURITY LAYER
            </p>
            <h3 className="mt-2 text-base font-semibold text-white">
              Wanky Protect
            </h3>
            <p className="mt-2 text-xs leading-5 text-zinc-400">
              The planned security and protection layer for the Wanky ecosystem:
              identity, access controls, threat detection, and security monitoring.
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-5 flex items-start gap-2 border-t border-white/10 pt-4">
        <Activity size={13} className="mt-0.5 shrink-0 text-zinc-500" />
        <p className="text-[10px] leading-5 text-zinc-500">
          Conceptual architecture illustrating the intended system layers.
          It is not a live service map or a claim that every component is
          currently deployed.
        </p>
      </div>
    </section>
  );
}
