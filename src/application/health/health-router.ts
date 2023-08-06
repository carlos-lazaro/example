import express, { Request, Response } from "express";

import { App, BaseRouter, HttpStatusCode, RouterApp } from "../../server";

class HealthRouterApp extends BaseRouter implements RouterApp {
  readonly router;

  constructor() {
    super({ path: "/health" });

    this.router = express.Router();

    this.router.get("/", (req: Request, res: Response) => {
      res.status(HttpStatusCode.NoContent).send();
    });
  }

  async use(dependencies: App): Promise<void> {
    dependencies.app.use(this.getFullPath(), this.router);
  }
}

export const healthRouterApp = new HealthRouterApp();
