import express, { Express } from "express";
import http from "http";

import {
  errorHandlerMiddleware,
  healthRouter,
  registerUserDependencies,
  userRouter,
} from "./application";
import { Logger } from "./core";
import { Env } from "./core/config/interface";
import {
  BodyParserMiddleware,
  container,
  CookieParserMiddleware,
  CorsMiddleware,
  ExpressRateLimitMiddleware,
  HelmedMiddleware,
  TypeormDatabase,
} from "./modules";

export class App {
  readonly app: Express;
  readonly env: Env;
  private logger: Logger;
  private db: TypeormDatabase;
  httpServer?: http.Server;

  constructor(
    logger: Logger = container.resolve("logger"),
    env: Env = container.resolve("env"),
    database: TypeormDatabase = container.resolve("database")
  ) {
    this.app = express();
    this.logger = logger;
    this.env = env;
    this.db = database;
  }

  loadMiddlewares() {
    this.logger.info("⚙️ middlewares loading...");

    CorsMiddleware(this.app);
    BodyParserMiddleware(this.app);
    HelmedMiddleware(this.app);
    CookieParserMiddleware(this.app);
    ExpressRateLimitMiddleware(this.app);
  }

  loadRoutes() {
    this.logger.info("⚙️ routes loading...");

    this.app.use("/api/v1/health", healthRouter);
    this.app.use("/api/v1/user", userRouter);
    this.app.use("/test", (req, res) => {
      this.logger.info("tesito");
      res.send({ tesito: true });
    });

    this.app.use(errorHandlerMiddleware);
  }

  async loadDependecies() {
    this.logger.info("⚙️ dependencies loading...");

    await registerUserDependencies(this.logger, container);
  }

  async start(): Promise<void> {
    await this.db
      .connect()
      .then(async () => {
        await this.loadDependecies();
      })
      .then(() => {
        this.loadMiddlewares();
        this.loadRoutes();
      })
      .then(async () => {
        this.httpServer = await this.app.listen(this.env.server.port);
      })
      .then(() => {
        this.logger.info(
          `👍 Backend App is running at http://localhost:${this.env.server.port}`
        );
      })
      .catch((error) => {
        this.logger.error(`😨 Backend error, ${error}`);
      });
  }
}
