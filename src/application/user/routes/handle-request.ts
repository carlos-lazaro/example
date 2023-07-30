import * as Awilix from "awilix";
import { NextFunction, Request, Response } from "express";

import { Logger } from "../../../core";
import { container } from "../../../modules";
import { UuidGenerator } from "../../common";
import { schemaValidationMiddleware } from "../../common/middleware/schema-validation-middleware";
import { Controller, HandleRequestType } from "../controllers";

export const handleRequest =
  (controllerInstanceName: HandleRequestType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const requestId = UuidGenerator.generateUuid();

    res.setHeader("Request-Id", requestId);

    const logger = container.resolve<Logger>("logger");
    const requestLogger = logger.child({
      requestId,
    });

    const requestContainer = container.createScope();

    requestContainer.register({
      logger: Awilix.asValue(requestLogger),
    });

    const controllerInstance = requestContainer.resolve<Controller>(
      controllerInstanceName
    );

    await schemaValidationMiddleware(controllerInstance.schema())(
      req,
      res,
      next
    );

    await controllerInstance.run(req, res, next);
  };
