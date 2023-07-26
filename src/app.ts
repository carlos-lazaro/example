import express, { Express } from "express";
import http from "http";

import { Env } from "./core/config/interface";
import { ConnectionDatabase, Logger } from "./interfaces";
import { TypeormDatabase } from "./modules";
import { container } from "./modules/dependency-injection";
import {
  BodyParserMiddleware,
  CookieParserMiddleware,
  CorsMiddleware,
  ExpressRateLimitMiddleware,
  HelmedMiddleware,
} from "./modules/middlewares";

export class App {
  readonly app: Express;
  readonly env: Env;
  private logger: Logger;
  private db: ConnectionDatabase;
  httpServer?: http.Server;

  constructor(
    logger: Logger = container.resolve("logger"),
    env: Env = container.resolve("env")
  ) {
    this.logger = logger;
    this.env = env;
    this.app = express();
    this.db = new TypeormDatabase(this.env, this.logger);

    this.loadMiddlewares();

    this.db.connect();
  }

  loadMiddlewares() {
    CorsMiddleware(this.app);
    BodyParserMiddleware(this.app);
    HelmedMiddleware(this.app);
    CookieParserMiddleware(this.app);
    ExpressRateLimitMiddleware(this.app);
  }

  async start(): Promise<void> {
    this.httpServer = await this.app.listen(this.env.server.port);
    this.logger.info(
      `Backend App is running at http://localhost:${this.env.server.port} ,env: ${this.env}`
    );
  }
}
