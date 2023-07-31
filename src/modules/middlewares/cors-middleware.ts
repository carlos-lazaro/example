import cors from "cors";
import { Express } from "express";

export function CorsMiddleware(app: Express): void {
  app.use(cors());
}
