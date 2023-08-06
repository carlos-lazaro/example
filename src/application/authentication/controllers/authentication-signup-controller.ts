import { NextFunction, Request, Response } from "express";

import {
  ConflictError,
  Controller,
  HttpStatusCode,
  Logger,
  SchemasConfig,
} from "../../../server";
import { User, UserDto } from "../../user";
import { AuthenticationService } from "../interfaces";

export class AuthenticationSignupController implements Controller {
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
    return { body: UserDto.Schema().options({ allowUnknown: true }) };
  }

  async run(req: Request, res: Response, next: NextFunction) {
    const userDto = new UserDto(req.body);
    const user = new User(userDto);

    this.logger.child({ user }).info("Received a request for signup");

    const response = await this.authenticationService.signup(user);

    if (!response) throw new ConflictError("Email is invalid", req.ip);

    res.status(HttpStatusCode.Ok).send({ authentication: response });
  }
}
