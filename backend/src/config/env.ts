export const env = {
  port: Number(process.env.PORT ?? 4000),
  apiKey: process.env.API_KEY?.trim() ?? "",
  mongoUri: process.env.MONGODB_URI?.trim() ?? "",
  redisUrl: process.env.REDIS_URL?.trim() ?? "",
  aviationStack: {
    apiKey: process.env.AVIATIONSTACK_API_KEY?.trim() ?? "",
    baseUrl: process.env.AVIATIONSTACK_BASE_URL?.trim() ?? "https://api.aviationstack.com/v1"
  },
  openSky: {
    username: process.env.OPENSKY_USERNAME?.trim() ?? "",
    password: process.env.OPENSKY_PASSWORD?.trim() ?? "",
    baseUrl: process.env.OPENSKY_BASE_URL?.trim() ?? "https://opensky-network.org/api"
  },
  planeSpotters: {
    apiKey: process.env.PLANESPOTTERS_API_KEY?.trim() ?? "",
    baseUrl: process.env.PLANESPOTTERS_BASE_URL?.trim() ?? "https://api.planespotters.net/pub/photos/reg"
  }
};