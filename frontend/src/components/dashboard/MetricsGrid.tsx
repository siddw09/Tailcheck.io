import type { TrackingPayload } from "@tailcheck/shared";

type MetricsGridProps = {
  tracking: TrackingPayload | null;
};

export function MetricsGrid({ tracking }: MetricsGridProps) {
  const metrics = [
    { label: "Ground Speed", value: tracking?.telemetry.speedKts ?? "--" },
    { label: "Altitude", value: tracking?.telemetry.altitudeFt ?? "--" },
    { label: "Track", value: tracking?.telemetry.trackDeg ?? "--" },
    { label: "Vertical Rate", value: tracking?.telemetry.verticalRateFpm ?? "--" }
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="rounded-[14px] border border-white/10 bg-console-panel/50 px-3 py-3 shadow-glow">
          <p className="text-[10px] uppercase tracking-[0.35em] text-console-muted">{metric.label}</p>
          <p className="mt-2 text-xl font-semibold text-white">{metric.value}</p>
        </div>
      ))}
    </section>
  );
}