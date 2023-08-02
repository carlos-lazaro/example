import { NextFunction, Request, Response } from "express";
// import { QueryFailedError, TypeORMError } from "typeorm";

// import { BaseError } from "../errors";

export function errorBaseErrorHandlerMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("------------> BaseError, ");
  // console.log("------------> BaseError, ", error);
  // console.log("------------> BaseError, ", typeof error);
  // console.log("------------> BaseError, ", error instanceof BaseError);
  // console.log("------------> BaseError, ", error instanceof QueryFailedError);
  // console.log("------------> BaseError, ", error instanceof TypeORMError);
  // console.log(
  //   "------------> BaseError, ",
  //   Object.getPrototypeOf(error).constructor.name
  // );

  // if (error instanceof BaseError) {
  //   console.log("------------> BaseError, ");
  //   const be = error as BaseError;

  //   res.status(be.status).json({ error: be.message });
  // }

  next();
}
