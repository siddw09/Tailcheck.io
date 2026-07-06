import type { AircraftTelemetry, SearchLog } from "./telemetry.js";

export type ProviderName = "opensky" | "aviationstack" | "planespotters";

export type ProviderStatus = {
  configured: boolean;
  mode: "mock" | "live";
  note: string;
};

export type TrackingAsset = {
  hex: string;
  imageUrl: string | null;
  credit: string | null;
  source: ProviderName;
};

export type RouteEnrichment = {
  registration: string;
  callsign: string | null;
  operator: string | null;
  origin: string | null;
  destination: string | null;
  remarks: string[];
};

export type TrackingPayload = {
  hex: string;
  generatedAt: string;
  telemetry: AircraftTelemetry;
  enrichment: RouteEnrichment;
  asset: TrackingAsset;
  providers: Record<ProviderName, ProviderStatus>;
  cache: {
    hit: boolean;
    ttlSeconds: number | null;
  };
  status: "mock" | "partial" | "live";
  search: SearchLog;
};

export type HistoryResponse = {
  items: Array<SearchLog & { label: string; status: string }>;
  total: number;
};