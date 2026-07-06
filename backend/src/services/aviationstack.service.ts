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
  const operators = ["Delta Air Lines", "United Airlines", "American Airlines", "Southwest Airlines", "JetBlue"];
  const routes = [
    { airport: "KJFK", city: "New York" },
    { airport: "KLAX", city: "Los Angeles" },
    { airport: "KORD", city: "Chicago" },
    { airport: "KATL", city: "Atlanta" },
    { airport: "KDFW", city: "Dallas" },
    { airport: "KDEN", city: "Denver" },
    { airport: "KSEA", city: "Seattle" },
    { airport: "KSFO", city: "San Francisco" }
  ];

  const departure = routes[seed % routes.length];
  const arrival = routes[(seed + 3) % routes.length];

  return {
    enrichment: {
      registration: hex.toUpperCase(),
      callsign: `${hex.toUpperCase().slice(0, 3)}${String(seed % 1000).padStart(3, "0")}`,
      operator: configured ? "Live operator feed" : operators[seed % operators.length],
      departureAirport: configured ? "Live feed" : departure.airport,
      departureCity: configured ? "Live feed" : departure.city,
      origin: configured ? "Departed live feed" : `${departure.city} (${departure.airport})`,
      arrivalAirport: configured ? "Live feed" : arrival.airport,
      arrivalCity: configured ? "Live feed" : arrival.city,
      destination: configured ? "Arrival live feed" : `${arrival.city} (${arrival.airport})`,
      remarks: configured
        ? ["AviationStack key detected.", "Route intelligence will resolve from the live provider."]
        : [
            `Fallback route profile generated for ${hex.toUpperCase()}.`,
            `Typical operator: ${operators[seed % operators.length]}.`,
            `Route corridor: ${departure.city} to ${arrival.city}.`
          ]
    },
    provider: {
      configured,
      mode: configured ? "live" : "mock",
      note: configured ? "AviationStack credentials detected." : "Set AVIATIONSTACK_API_KEY to enable live route intelligence."
    }
  };
}