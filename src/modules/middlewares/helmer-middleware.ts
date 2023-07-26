import { Express } from "express";
import helmet from "helmet";

export function HelmedMiddleware(app: Express): void {
  app.use(helmet());
}
