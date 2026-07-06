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
      imageUrl: configured ? `https://images.example.com/${hex.toUpperCase()}.jpg` : `https://picsum.photos/seed/${hex.toUpperCase()}/800/450`,
      credit: configured ? "PlaneSpotters" : "Fallback aircraft placeholder",
      source: "planespotters"
    },
    provider: {
      configured,
      mode: configured ? "live" : "mock",
      note: configured ? "PlaneSpotters credentials detected." : "Set PLANESPOTTERS_API_KEY to enable live aircraft imagery."
    }
  };
}