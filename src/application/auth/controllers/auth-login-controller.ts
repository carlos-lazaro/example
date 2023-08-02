import { NextFunction, Request, Response } from "express";

import { Logger } from "../../../core";
import { NotFoundError } from "../../common";
import { SchemasConfig } from "../../common/middleware/schema-validation-middleware";
import { User } from "../../user";
import { AuthLogin } from "../entities";
import { AuthService } from "../interfaces";
import { Controller } from "../interfaces/controller-interface";

export class AuthLoginController implements Controller {
  readonly logger;
  readonly authService;

  constructor(dependencies: { logger: Logger; authService: AuthService }) {
    this.logger = dependencies.logger;
    this.authService = dependencies.authService;
  }

  schema(): SchemasConfig | null {
    return { body: AuthLogin.Schema() };
  }

  async run(req: Request, res: Response, next: NextFunction) {
    const login = new AuthLogin(req.body);

    this.logger.child({ login }).info("Received a request for login");

    const response = await this.authService.login(login);

    if (!response) throw new NotFoundError("Email of Password invalid", req.ip);

    res.status(200).send({ user: User.noSensitiveInformation(response) });
  }
}
