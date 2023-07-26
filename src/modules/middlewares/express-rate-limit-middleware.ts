import { Express } from "express";
import expressRateLimit from "express-rate-limit";

export function ExpressRateLimitMiddleware(app: Express): void {
  const limiter = expressRateLimit({
    windowMs: 10 * 60 * 1000, //10 Mints
    max: 100,
  });

  app.use(limiter);
}
