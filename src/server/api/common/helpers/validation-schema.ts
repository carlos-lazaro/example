import { NextFunction, Request, Response } from "express";

import { RequestValues } from "../../constants";
import { BadRequestError } from "../../errors";
import { SchemasConfig } from "../../interfaces";

export const schemaValidation = (schemas: SchemasConfig | null) => {
  return async function schemaValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (schemas != null) {
      const errors: string[] = [];

      Object.entries(schemas).forEach(([requestPart, schema]) => {
        if (schema != null) {
          const { error } = schema.validate(req[requestPart as RequestValues], {
            abortEarly: false,
          });

          if (error != null) {
            errors.push({ ...error, type: requestPart });
          }
        }
      });

      if (errors.length > 0)
        throw new BadRequestError("Bad Request", req.ip, errors);
    }
  };
};
