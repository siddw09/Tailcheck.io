import type { TrackingPayload } from "@tailcheck/shared";

type FeedStatusCardProps = {
  tracking: TrackingPayload | null;
  error: string | null;
  query: string;
  isLoading?: boolean;
  isValidationError?: boolean;
  onRetry: () => void;
};

export function FeedStatusCard({ tracking, error, query, isLoading = false, isValidationError = false, onRetry }: FeedStatusCardProps) {
  const statusLabel = tracking ? tracking.status.toUpperCase() : isLoading ? "QUERYING" : "STANDBY";
  const title = error && !isValidationError ? "Server communication failed. Please try again." : error ? "Input needs attention." : "Feed status";
  const providerNote = tracking?.providers.aviationstack.note;
  const summaryNote = tracking
    ? `${tracking.enrichment.operator ?? "Unknown operator"} • ${tracking.enrichment.origin ?? "Unknown origin"} → ${tracking.enrichment.destination ?? "Unknown destination"}`
    : "Waiting for a query.";
  const routeNote = tracking
    ? `${tracking.enrichment.departureCity ?? tracking.enrichment.origin ?? "Unknown departure"} → ${tracking.enrichment.arrivalCity ?? tracking.enrichment.destination ?? "Unknown arrival"}`
    : "Departure and arrival will appear here.";
  const statusMessage = providerNote?.startsWith("Set AVIATIONSTACK_API_KEY")
    ? "Mock mode active. Add AVIATIONSTACK_API_KEY for live route intelligence."
    : providerNote ?? "Waiting for a query.";

  return (
    <section className="min-h-[290px] rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,20,36,0.95),rgba(7,13,22,0.95))] p-4 shadow-glow">
      <div className="flex items-center justify-between gap-3">
        <p className={`text-[10px] uppercase tracking-[0.45em] ${error && !isValidationError ? "text-red-300/90" : "text-console-muted"}`}>
          {title}
        </p>
        <button className="text-xs text-slate-400 hover:text-white" type="button" onClick={onRetry}>
          Refresh
        </button>
      </div>
      <div className="mt-3 h-[220px] rounded-[16px] border border-white/5 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.02),transparent_45%),linear-gradient(180deg,rgba(4,8,16,0.96),rgba(8,12,20,0.98))] p-4">
        <div className="flex h-full flex-col justify-between">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.35em] text-console-muted">Current Query</p>
            <p className="text-lg font-semibold text-white">{query || "—"}</p>
          </div>
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.35em] text-console-muted">Status</p>
            <p className="text-sm text-slate-300">{error ?? statusMessage}</p>
            <p className="text-sm text-slate-400">{tracking ? summaryNote : "Enter a 6-character ICAO hex to load aircraft data."}</p>
            <p className="text-sm text-slate-400">{routeNote}</p>
            <p className="text-sm font-semibold text-console-accent">{statusLabel}</p>
          </div>
        </div>
      </div>
    </section>
  );
}