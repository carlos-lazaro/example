import { NextFunction, Request, Response } from "express";
import { TypeORMError } from "typeorm";

import { HttpStatusCode } from "../constants";
import { BaseError } from "../errors";

export function errorHandlerMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof BaseError) {
    const be = error as BaseError;
    console.log("------------> BaseError, ", be);

    return res.status(be.status).json({ error: be.message });
  }

  if (error instanceof TypeORMError) {
    const toe = error as TypeORMError;
    console.log("------------> TypeORMError, ", toe);

    return res.status(HttpStatusCode.Conflict).json({ error: toe.message });
  }

  let statusCode = HttpStatusCode.InternalServer;
  let errorMessage = "Internal Server Error";

  error.status && (statusCode = error.status);
  error.message && (errorMessage = error.message);

  res.status(statusCode).json({ message: errorMessage });
}
