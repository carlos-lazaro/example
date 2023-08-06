import { NextFunction, Request, Response } from "express";
import { TypeORMError } from "typeorm";

import { BaseError } from "../../errors";
import { App } from "../../interfaces";
import { HttpStatusCode } from "../constants";
import { Middleware } from "./interface";

export class ErrorMiddleware implements Middleware {
  async use(dependencies: App): Promise<void> {
    dependencies.app.use(
      (error: any, req: Request, res: Response, next: NextFunction) => {
        dependencies.logger.child({ error }).info("ErrorMiddleware");

        if (error instanceof BaseError) {
          const hre = error as BaseError;
          const [status, response] = hre.getErrorResponse();

          return res.status(status).json({ ...response });
        }

        if (error instanceof TypeORMError) {
          const toe = error as TypeORMError;

          return res
            .status(HttpStatusCode.Conflict)
            .json({ message: toe.message });
        }

        let statusCode = HttpStatusCode.InternalServer;
        let errorMessage = "Internal Server Error";

        error.status && (statusCode = error.status);
        error.message && (errorMessage = error.message);

        res.status(statusCode).json({ message: errorMessage });
      }
    );
  }
}
