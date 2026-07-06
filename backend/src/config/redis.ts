import { createClient } from "redis";

export function createRedisClient() {
  const client = createClient({ url: process.env.REDIS_URL });
  client.on("error", (error) => {
    console.error("Redis error", error);
  });
  return client;
}