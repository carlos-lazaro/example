import { NextFunction, Request, Response } from "express";
// import { TypeORMError } from "typeorm";

// import { HttpStatusCode } from "../../../../application";

export function errorTypeOrmErrorHandlerMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("------------> TypeORMError, ");
  // console.log("------------> TypeORMError, ", error);
  // if (error instanceof TypeORMError) {
  //   console.log("------------> TypeORMError, ");
  //   const toe = error as TypeORMError;

  //   res.status(HttpStatusCode.Conflict).json({ error: toe.message });
  // }

  next();
}
