import bodyParser from "body-parser";

import { App } from "../../interfaces";
import { BadRequestError } from "../errors";
import { Middleware } from "./interface";

export class BodyParserMiddleware implements Middleware {
  async use(dependencies: App): Promise<void> {
    dependencies.app.use((req, res, next) => {
      bodyParser.urlencoded({ extended: true })(req, res, (err) => {
        if (err) {
          next(new BadRequestError(err.message, req.ip));
        }
        next();
      });
    });

    dependencies.app.use((req, res, next) => {
      bodyParser.json()(req, res, (err) => {
        if (err) {
          next(new BadRequestError(err.message, req.ip));
        }
        next();
      });
    });
  }
}
