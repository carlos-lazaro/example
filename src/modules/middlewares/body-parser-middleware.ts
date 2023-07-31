import bodyParser from "body-parser";
import { Express } from "express";

export function BodyParserMiddleware(app: Express): void {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
}
