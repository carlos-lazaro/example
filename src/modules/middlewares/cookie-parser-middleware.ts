import cookieParser from "cookie-parser";
import { Express } from "express";

export function CookieParserMiddleware(app: Express): void {
  app.use(cookieParser());
}
