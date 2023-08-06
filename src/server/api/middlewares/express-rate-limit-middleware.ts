import { NextFunction, Request, Response } from "express";
import expressRateLimit, { Options } from "express-rate-limit";

import { App } from "../../interfaces";
import { TooManyRequestsError } from "../errors";
import { Middleware } from "./interface";

export class ExpressRateLimitMiddleware implements Middleware {
  readonly options;

  constructor(passedOptions?: Partial<Options>) {
    this.options = expressRateLimit(
      passedOptions || {
        windowMs: 60 * 1000, // 1 Minute
        max: 70,
        handler: (
          req: Request,
          res: Response,
          next: NextFunction,
          options: Options
        ) => {
          throw new TooManyRequestsError("Try later.", req.ip);
        },
      }
    );
  }

  async use(dependencies: App): Promise<void> {
    dependencies.app.use(this.options);
  }
}
