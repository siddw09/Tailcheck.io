import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import apiRouter from "./routes/api.router.js";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true
  })
);
app.use(express.json());
app.use("/api", apiRouter);

app.get("/health", (_, response) => {
  response.json({
    status: "ok",
    service: "tailcheck-backend",
    configured: {
      apiKey: Boolean(env.apiKey),
      mongodb: Boolean(env.mongoUri),
      redis: Boolean(env.redisUrl),
      aviationstack: Boolean(env.aviationStack.apiKey),
      opensky: Boolean(env.openSky.username && env.openSky.password),
      planespotters: Boolean(env.planeSpotters.apiKey)
    }
  });
});

export default app;