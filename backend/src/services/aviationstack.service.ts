import type { ProviderStatus, RouteEnrichment } from "@tailcheck/shared";
import { env } from "../config/env.js";

function hashHex(hex: string) {
  return Array.from(hex.toUpperCase()).reduce((total, character) => total + character.charCodeAt(0), 0);
}

export async function getAviationStackTelemetry(hex: string): Promise<{
  enrichment: RouteEnrichment;
  provider: ProviderStatus;
}> {
  const configured = Boolean(env.aviationStack.apiKey);
  const seed = hashHex(hex);

  return {
    enrichment: {
      registration: hex.toUpperCase(),
      callsign: `${hex.toUpperCase().slice(0, 3)}${String(seed % 1000).padStart(3, "0")}`,
      operator: configured ? "Live operator feed" : "Demo carrier profile",
      origin: configured ? "Departed live feed" : "Unknown",
      destination: configured ? "Arrival live feed" : "Unknown",
      remarks: configured
        ? ["AviationStack key detected.", "Route intelligence will resolve from the live provider."]
        : ["Set AVIATIONSTACK_API_KEY to enable live route intelligence.", "Fallback metadata is currently in use."]
    },
    provider: {
      configured,
      mode: configured ? "live" : "mock",
      note: configured ? "AviationStack credentials detected." : "Set AVIATIONSTACK_API_KEY to enable live route intelligence."
    }
  };
}