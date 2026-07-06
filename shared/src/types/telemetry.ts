export type AircraftTelemetry = {
  hex: string;
  callsign: string | null;
  latitude: number | null;
  longitude: number | null;
  altitudeFt: number | null;
  speedKts: number | null;
  verticalRateFpm: number | null;
  trackDeg: number | null;
  source: "opensky" | "aviationstack" | "planespotters";
};

export type OpenSkyCoordinates = {
  latitude: number;
  longitude: number;
  altitudeFt: number;
  trackDeg: number;
};

export type SearchLog = {
  hex: string;
  searchedAt: string;
  resolved: boolean;
};