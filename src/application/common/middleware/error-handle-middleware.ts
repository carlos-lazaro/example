import { NextFunction, Request, Response } from "express";

import { BaseError } from "../errors";

export function errorHandlerMiddleware(
  error: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = 500;
  let errorMessage = "Internal Server Error";

  error.status && (statusCode = error.status);
  error.message && (errorMessage = error.message);

  res.status(statusCode).json({ error: errorMessage });
}
