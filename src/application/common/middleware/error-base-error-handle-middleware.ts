import { NextFunction, Request, Response } from "express";

import { BaseError } from "../errors";

export function errorBaseErrorHandlerMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof BaseError) {
    const be = error as BaseError;

    res.status(be.status).json({ error: be.message });
  }

  next();
}
