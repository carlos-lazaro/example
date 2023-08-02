import { NextFunction, Request, Response } from "express";

import { Logger } from "../../../core";
import { ConflictError } from "../../common/errors";
import { SchemasConfig } from "../../common/middleware/schema-validation-middleware";
import { User } from "../../user";
import { AuthService } from "../interfaces";
import { Controller } from "../interfaces/controller-interface";

export class AuthRegisterController implements Controller {
  readonly logger;
  readonly authService;

  constructor(dependencies: { logger: Logger; authService: AuthService }) {
    this.logger = dependencies.logger;
    this.authService = dependencies.authService;
  }

  schema(): SchemasConfig | null {
    return { body: User.Schema() };
  }

  async run(req: Request, res: Response, next: NextFunction) {
    const user = new User(req.body);

    this.logger.child({ user }).info("Received a request for register a user");

    const response = await this.authService.register(user);

    if (!response) throw new ConflictError("Email is invalid", req.ip);

    res.status(200).send({ user: User.noSensitiveInformation(response) });
  }
}
