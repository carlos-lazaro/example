import { NextFunction, Request, Response } from "express";

import {
  Controller,
  HttpStatusCode,
  Logger,
  SchemasConfig,
} from "../../../server";
import { UserDto } from "../dtos";
import { User } from "../entities";
import { UserService } from "../interfaces";

export class UserCreateController implements Controller {
  readonly logger;
  readonly userService;

  constructor(dependencies: { logger: Logger; userService: UserService }) {
    this.logger = dependencies.logger;
    this.userService = dependencies.userService;
  }

  schema(): SchemasConfig | null {
    return { body: UserDto.Schema().options({ allowUnknown: true }) };
  }

  async run(req: Request, res: Response, next: NextFunction) {
    const userDto = new UserDto(req.body);
    const user = new User(userDto);

    this.logger.child({ user }).info("Received a request for save user");

    const response = await this.userService.createExcludeFields(user);

    res.status(HttpStatusCode.Created).send({ user: response });
  }
}
