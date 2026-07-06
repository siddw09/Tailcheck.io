import type { ProviderStatus, TrackingAsset } from "@tailcheck/shared";
import { env } from "../config/env.js";

export async function getPlaneSpottersAsset(hex: string): Promise<{
  asset: TrackingAsset;
  provider: ProviderStatus;
}> {
  const configured = Boolean(env.planeSpotters.apiKey);

  return {
    asset: {
      hex,
      imageUrl: configured ? `https://images.example.com/${hex.toUpperCase()}.jpg` : null,
      credit: configured ? "PlaneSpotters" : null,
      source: "planespotters"
    },
    provider: {
      configured,
      mode: configured ? "live" : "mock",
      note: configured ? "PlaneSpotters credentials detected." : "Set PLANESPOTTERS_API_KEY to enable live aircraft imagery."
    }
  };
}