import type { HistoryResponse, TrackingPayload } from "@tailcheck/shared";
import { SearchLogModel } from "../models/SearchLog.js";
import { getAviationStackTelemetry } from "./aviationstack.service.js";
import { getOpenSkyTelemetry } from "./opensky.service.js";
import { getPlaneSpottersAsset } from "./planespotters.service.js";

const inMemoryHistory: HistoryResponse["items"] = [];
const inMemoryCache = new Map<string, { payload: TrackingPayload; expiresAt: number }>();
const cacheTtlMs = 5 * 60 * 1000;

function createHistoryItem(hex: string, resolved: boolean) {
  return {
    hex,
    searchedAt: new Date().toISOString(),
    resolved,
    label: resolved ? "Resolved" : "Pending",
    status: resolved ? "Tracked" : "Waiting Query"
  };
}

function computePayloadStatus(payload: TrackingPayload): TrackingPayload["status"] {
  if (payload.providers.opensky.mode === "live" && payload.providers.aviationstack.mode === "live") {
    return "live";
  }

  if (payload.providers.opensky.mode === "mock" && payload.providers.aviationstack.mode === "mock") {
    return "mock";
  }

  return "partial";
}

async function readHistoryFromDb() {
  try {
    const logs = await SearchLogModel.find().sort({ searchedAt: -1 }).limit(25).lean();
    return logs.map((log) => ({
      hex: log.hex,
      searchedAt: new Date(log.searchedAt).toISOString(),
      resolved: Boolean(log.resolved),
      label: log.resolved ? "Resolved" : "Pending",
      status: log.resolved ? "Tracked" : "Waiting Query"
    }));
  } catch {
    return inMemoryHistory.slice(0, 25);
  }
}

async function saveHistoryEntry(hex: string, resolved: boolean) {
  const entry = createHistoryItem(hex, resolved);

  inMemoryHistory.unshift(entry);
  inMemoryHistory.splice(25);

  try {
    await SearchLogModel.create({ hex, searchedAt: new Date(entry.searchedAt), resolved });
  } catch {
    return;
  }
}

export async function getTrackingSnapshot(hex: string): Promise<TrackingPayload> {
  const cacheEntry = inMemoryCache.get(hex);
  if (cacheEntry && cacheEntry.expiresAt > Date.now()) {
    return {
      ...cacheEntry.payload,
      cache: {
        hit: true,
        ttlSeconds: Math.max(0, Math.ceil((cacheEntry.expiresAt - Date.now()) / 1000))
      }
    };
  }

  const [opensky, aviationstack, planespotters] = await Promise.all([
    getOpenSkyTelemetry(hex),
    getAviationStackTelemetry(hex),
    getPlaneSpottersAsset(hex)
  ]);

  const payload: TrackingPayload = {
    hex,
    generatedAt: new Date().toISOString(),
    telemetry: opensky.telemetry,
    enrichment: aviationstack.enrichment,
    asset: planespotters.asset,
    providers: {
      opensky: opensky.provider,
      aviationstack: aviationstack.provider,
      planespotters: planespotters.provider
    },
    cache: {
      hit: false,
      ttlSeconds: Math.round(cacheTtlMs / 1000)
    },
    status: "mock",
    search: createHistoryItem(hex, true)
  };

  payload.status = computePayloadStatus(payload);

  inMemoryCache.set(hex, {
    payload,
    expiresAt: Date.now() + cacheTtlMs
  });

  await saveHistoryEntry(hex, true);

  return payload;
}

export async function getSearchHistory(): Promise<HistoryResponse> {
  const items = await readHistoryFromDb();
  return {
    items,
    total: items.length
  };
}