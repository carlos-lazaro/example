import bodyParser from "body-parser";
import express from "express";

import { env } from "./config";
import { SequelizeDatabase } from "./dependencies/database/sequelize";
import { PinoLogger } from "./dependencies/logger";
import { healthRouter } from "./health/health-router";

function boostrap() {
  const app = express();
  const logger = new PinoLogger(env);
  const db = new SequelizeDatabase(env, logger);

  app.use(bodyParser.json());

  app.use("/health", healthRouter);

  const { port } = env.server;

  db.connect();

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
  });
}

boostrap();
