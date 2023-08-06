import * as Awilix from "awilix";
import { NextFunction, Request, Response } from "express";

import { container, Logger } from "../../../module";
import { generateUuid, schemaValidation } from "../../common";
import { Controller } from "../../interfaces";

export const handleRequest =
  (controllerInstanceName: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const requestId = generateUuid();

    res.setHeader("Request-Id", requestId);

    const logger = container.resolve<Logger>("logger");
    const requestLogger = logger?.child({
      requestId,
    });

    const requestContainer = container.createScope();

    requestContainer.register({
      logger: Awilix.asValue(requestLogger),
    });

    const controllerInstance = requestContainer.resolve<Controller>(
      controllerInstanceName
    );

    if (!controllerInstance) throw new Error("No implemented!");

    await schemaValidation(controllerInstance.schema())(req, res, next);

    await controllerInstance.run(req, res, next);
  };
