import type { TrackingPayload } from "@tailcheck/shared";

type LiveRadarProps = {
  tracking: TrackingPayload | null;
};

export function LiveRadar({ tracking }: LiveRadarProps) {
  const telemetry = tracking?.telemetry;
  const departure = tracking?.enrichment.departureCity ?? tracking?.enrichment.origin ?? null;
  const arrival = tracking?.enrichment.arrivalCity ?? tracking?.enrichment.destination ?? null;
  const latitude = telemetry?.latitude ?? 0;
  const longitude = telemetry?.longitude ?? 0;
  const markerLeft = Math.min(92, Math.max(8, ((longitude + 180) / 360) * 100));
  const markerTop = Math.min(92, Math.max(8, ((90 - latitude) / 180) * 100));
  const coordinateLabel = telemetry ? `${latitude.toFixed(3)}, ${longitude.toFixed(3)}` : "No coordinates yet";

  return (
    <section className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,20,36,0.97),rgba(7,13,22,0.97))] p-4 shadow-glow">
      <div className="flex items-center justify-between gap-4 px-1">
        <div>
          <p className="text-[10px] uppercase tracking-[0.45em] text-console-muted">Live Radar View</p>
        </div>
        <div className="text-xs text-slate-400">
          {tracking ? `Tracking ${tracking.hex}` : "Aircraft currently out of radar coverage"}
        </div>
      </div>
      <div className="mt-3 rounded-[18px] border border-white/12 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_40%),linear-gradient(180deg,rgba(14,16,22,0.95),rgba(10,12,16,0.96))] p-3">
        <div className="relative h-[245px] overflow-hidden rounded-[16px] border border-white/20 bg-[radial-gradient(circle_at_center,rgba(18,18,26,0.95),rgba(8,9,12,1))]">
          <div className="absolute inset-0 opacity-25 console-grid" />
          <div className="absolute inset-0 bg-[linear-gradient(transparent_49%,rgba(255,255,255,0.04)_50%,transparent_51%),linear-gradient(90deg,transparent_49%,rgba(255,255,255,0.04)_50%,transparent_51%)] bg-[size:100%_32px,32px_100%] opacity-35" />
          <div className="absolute left-2 top-2 h-24 w-24 rounded-full border border-white/5 bg-white/5 blur-sm" />
          <div
            className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-console-accent shadow-[0_0_0_6px_rgba(79,209,197,0.18),0_0_18px_rgba(79,209,197,0.95)]"
            style={{ left: `${markerLeft}%`, top: `${markerTop}%` }}
          />
          <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-console-accent/15" />
          <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-console-accent/10" />
          <div className="absolute left-3 top-3 rounded-md border border-white/10 bg-black/60 px-2 py-1 text-[10px] text-slate-300">
            {coordinateLabel}
          </div>
          <div className="absolute right-3 top-3 rounded-md border border-white/10 bg-black/60 px-2 py-1 text-[10px] text-slate-300">
            {departure && arrival ? `${departure} → ${arrival}` : "Route pending"}
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-xs text-slate-300">
            {tracking ? `Callsign ${telemetry?.callsign ?? tracking.hex} • ${tracking.status}` : "Aircraft currently out of OpenSky coverage."}
          </div>
          <div className="absolute bottom-2 right-2 rounded-sm border border-white/10 bg-white/80 px-1.5 py-0.5 text-[10px] text-slate-600">
            Leaflet | © OpenStreetMap © CARTO
          </div>
        </div>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[14px] border border-white/10 bg-white/[0.03] px-3 py-3">
          <p className="text-[10px] uppercase tracking-[0.35em] text-console-muted">Ground Speed</p>
          <p className="mt-2 text-lg font-semibold text-white">{telemetry?.speedKts ?? "--"}</p>
        </div>
        <div className="rounded-[14px] border border-white/10 bg-white/[0.03] px-3 py-3">
          <p className="text-[10px] uppercase tracking-[0.35em] text-console-muted">Altitude</p>
          <p className="mt-2 text-lg font-semibold text-white">{telemetry?.altitudeFt ?? "--"}</p>
        </div>
        <div className="rounded-[14px] border border-white/10 bg-white/[0.03] px-3 py-3">
          <p className="text-[10px] uppercase tracking-[0.35em] text-console-muted">Track</p>
          <p className="mt-2 text-lg font-semibold text-white">{telemetry?.trackDeg ?? "--"}</p>
        </div>
        <div className="rounded-[14px] border border-white/10 bg-white/[0.03] px-3 py-3">
          <p className="text-[10px] uppercase tracking-[0.35em] text-console-muted">Vertical Rate</p>
          <p className="mt-2 text-lg font-semibold text-white">{telemetry?.verticalRateFpm ?? "--"}</p>
        </div>
      </div>
    </section>
  );
}