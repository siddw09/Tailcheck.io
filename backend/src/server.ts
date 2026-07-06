import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";


async function start() {
  await connectDatabase(env.mongoUri);

  app.listen(env.port, () => {
    console.log(`TailCheck backend listening on port ${env.port}`);
  });
}

void start();