import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { BadRequestError } from "../errors";

enum RequestValues {
  Body = "body",
  Query = "query",
  Headers = "headers",
  Params = "params",
}

export interface SchemasConfig {
  body?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
  headers?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
}

export const schemaValidationMiddleware = (schemas: SchemasConfig | null) => {
  return async function schemaValidationMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (schemas != null) {
      Object.entries(schemas).forEach(([requestPart, schema]) => {
        if (schema != null) {
          const { error } = schema.validate(req[requestPart as RequestValues]);

          if (error != null) {
            throw new BadRequestError(error.message, req.ip);
          }
        }
      });
    }
  };
};
