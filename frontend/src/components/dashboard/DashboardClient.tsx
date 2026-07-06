"use client";

import { useEffect, useState, useTransition } from "react";
import type { HistoryResponse, TrackingPayload } from "@tailcheck/shared";
import { apiRequest } from "@/utils/api";
import { FeedStatusCard } from "@/components/dashboard/FeedStatusCard";
import { HistoryLog } from "@/components/dashboard/HistoryLog";
import { LiveRadar } from "@/components/dashboard/LiveRadar";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { SearchBox } from "@/components/dashboard/SearchBox";

const defaultHex = "N90BFD";

export function DashboardClient() {
  const [query, setQuery] = useState(defaultHex);
  const [tracking, setTracking] = useState<TrackingPayload | null>(null);
  const [history, setHistory] = useState<HistoryResponse["items"]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function loadHistory() {
    const response = await apiRequest<HistoryResponse>("/api/history");
    setHistory(response.items);
  }

  useEffect(() => {
    void loadHistory().catch((loadError: unknown) => {
      setError(loadError instanceof Error ? loadError.message : "Unable to load search history.");
    });
  }, []);

  async function handleSearch(nextQuery: string) {
    const normalized = nextQuery.trim().toUpperCase();

    if (!normalized) {
      setError("Enter a registration or ICAO hex first.");
      return;
    }

    setError(null);
    setQuery(normalized);

    const payload = await apiRequest<TrackingPayload>(`/api/tracking/${encodeURIComponent(normalized)}`);
    setTracking(payload);
    await loadHistory();
  }

  return (
    <div className="space-y-4">
      <FeedStatusCard
        error={error}
        tracking={tracking}
        query={query}
        isLoading={isPending}
        onRetry={() => {
          startTransition(() => {
            void handleSearch(query).catch((searchError: unknown) => {
              setError(searchError instanceof Error ? searchError.message : "Search failed.");
            });
          });
        }}
      />
      <div className="rounded-[18px] border border-white/10 bg-console-panel/40 p-3 text-xs text-console-muted">
        Backend is live through the same frontend origin. API calls are proxied by Next.js rewrites.
      </div>
      <div className="space-y-4">
        <SearchBox
          value={query}
          onChange={setQuery}
          onSubmit={(value) => {
            startTransition(() => {
              void handleSearch(value).catch((searchError: unknown) => {
                setError(searchError instanceof Error ? searchError.message : "Search failed.");
              });
            });
          }}
          isLoading={isPending}
        />
        <LiveRadar tracking={tracking} />
        <MetricsGrid tracking={tracking} />
        <div className="rounded-[18px] border border-white/10 bg-console-panel/60 px-4 py-3 text-sm text-slate-300">
          {tracking ? tracking.enrichment.remarks[0] ?? "Route intelligence loaded." : "Unable to load route intelligence."}
        </div>
      </div>
      <HistoryLog items={history} />
    </div>
  );
}