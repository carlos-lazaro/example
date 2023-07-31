import { Express } from "express";
import expressRateLimit from "express-rate-limit";

export function ExpressRateLimitMiddleware(app: Express): void {
  const limiter = expressRateLimit({
    windowMs: 60 * 1000, // 1 Minute
    max: 90,
  });

  app.use(limiter);
}
