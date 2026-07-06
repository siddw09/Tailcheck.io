import type { TrackingPayload } from "@tailcheck/shared";

type FeedStatusCardProps = {
  tracking: TrackingPayload | null;
  error: string | null;
  query: string;
  isLoading?: boolean;
  onRetry: () => void;
};

export function FeedStatusCard({ tracking, error, query, isLoading = false, onRetry }: FeedStatusCardProps) {
  const statusLabel = tracking ? tracking.status.toUpperCase() : isLoading ? "QUERYING" : "IDLE";

  return (
    <section className="min-h-[290px] rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,20,36,0.95),rgba(7,13,22,0.95))] p-4 shadow-glow">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] uppercase tracking-[0.45em] text-red-300/90">
          {error ? "Server communication failed. Please try again." : "Feed status"}
        </p>
        <button className="text-xs text-slate-400 hover:text-white" type="button" onClick={onRetry}>
          Refresh
        </button>
      </div>
      <div className="mt-3 h-[220px] rounded-[16px] border border-white/5 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.02),transparent_45%),linear-gradient(180deg,rgba(4,8,16,0.96),rgba(8,12,20,0.98))] p-4">
        <div className="flex h-full flex-col justify-between">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.35em] text-console-muted">Current Query</p>
            <p className="text-lg font-semibold text-white">{query || "N90BFD"}</p>
          </div>
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.35em] text-console-muted">Status</p>
            <p className="text-sm text-slate-300">{error ?? tracking?.providers.aviationstack.note ?? "Waiting for a query."}</p>
            <p className="text-sm font-semibold text-console-accent">{statusLabel}</p>
          </div>
        </div>
      </div>
    </section>
  );
}