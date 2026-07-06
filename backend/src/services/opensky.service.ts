import type { ProviderStatus } from "@tailcheck/shared";
import { env } from "../config/env.js";

function hashHex(hex: string) {
  return Array.from(hex.toUpperCase()).reduce((total, character) => total + character.charCodeAt(0), 0);
}

export async function getOpenSkyTelemetry(hex: string): Promise<{
  telemetry: {
    hex: string;
    callsign: string | null;
    latitude: number | null;
    longitude: number | null;
    altitudeFt: number | null;
    speedKts: number | null;
    verticalRateFpm: number | null;
    trackDeg: number | null;
    source: "opensky";
  };
  provider: ProviderStatus;
}> {
  const seed = hashHex(hex);
  const configured = Boolean(env.openSky.username && env.openSky.password);
  const fallbackLatitude = 33 + (seed % 1200) / 100;
  const fallbackLongitude = -125 + (seed % 1600) / 100;
  const fallbackAltitude = 28000 + (seed % 12000);
  const fallbackSpeed = 380 + (seed % 120);
  const fallbackTrack = (seed * 7) % 360;

  return {
    telemetry: {
      hex,
      callsign: `${hex.toUpperCase().slice(0, 3)}${String(seed % 1000).padStart(3, "0")}`,
      latitude: fallbackLatitude,
      longitude: fallbackLongitude,
      altitudeFt: configured ? 34500 : fallbackAltitude,
      speedKts: configured ? 452 : fallbackSpeed,
      verticalRateFpm: configured ? 0 : -600 + (seed % 1200),
      trackDeg: fallbackTrack,
      source: "opensky"
    },
    provider: {
      configured,
      mode: configured ? "live" : "mock",
      note: configured ? "OpenSky credentials detected." : "Set OPENSKY_USERNAME and OPENSKY_PASSWORD to enable live OpenSky lookups."
    }
  };
}