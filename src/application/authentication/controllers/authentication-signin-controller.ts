import { NextFunction, Request, Response } from "express";

import {
  Controller,
  HttpStatusCode,
  Logger,
  NotFoundError,
  SchemasConfig,
} from "../../../server";
import { LoginEmailDto } from "../dtos";
import { AuthenticationService } from "../interfaces";

export class AuthenticationSigninController implements Controller {
  readonly logger;
  readonly authenticationService;

  constructor(dependencies: {
    logger: Logger;
    authenticationService: AuthenticationService;
  }) {
    this.logger = dependencies.logger;
    this.authenticationService = dependencies.authenticationService;
  }

  schema(): SchemasConfig | null {
    return { body: LoginEmailDto.Schema().options({ allowUnknown: true }) };
  }

  async run(req: Request, res: Response, next: NextFunction) {
    const loginEmailDto = new LoginEmailDto(req.body);

    this.logger.child({ loginEmailDto }).info("Received a request for signin");

    const response = await this.authenticationService.signin(loginEmailDto);

    if (!response) throw new NotFoundError("Email of Password invalid", req.ip);

    res.status(HttpStatusCode.Ok).send({ authentication: response });
  }
}
