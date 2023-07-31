import { NextFunction, Request, Response } from "express";

import { HttpStatusCode } from "../constants";

export function errorHandlerMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = HttpStatusCode.InternalServer;
  let errorMessage = "Internal Server Error";

  error.status && (statusCode = error.status);
  error.message && (errorMessage = error.message);

  res.status(statusCode).json({ message: errorMessage });
}
