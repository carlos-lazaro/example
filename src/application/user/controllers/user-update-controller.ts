import { NextFunction, Request, Response } from "express";

import {
  Controller,
  HttpStatusCode,
  Logger,
  NotFoundError,
  SchemasConfig,
} from "../../../server";
import { IdDto, partialSchema } from "../../shared";
import { UserDto } from "../dtos";
import { User } from "../entities";
import { UserService } from "../interfaces";

export class UserUpdateController implements Controller {
  readonly logger;
  readonly userService;

  constructor(dependencies: { logger: Logger; userService: UserService }) {
    this.logger = dependencies.logger;
    this.userService = dependencies.userService;
  }

  schema(): SchemasConfig | null {
    return {
      params: IdDto.Schema(),
      body: partialSchema(UserDto.Schema()).options({ allowUnknown: true }),
    };
  }

  async run(req: Request, res: Response, next: NextFunction) {
    const userDto = new UserDto(req.body);
    const user = new User(userDto);

    this.logger.child({ user }).info("Received a request for update user");

    const userUpdated = await this.userService.updatePasswordExcludeFields(
      user,
      Number(req.params.id)
    );

    if (!userUpdated) throw new NotFoundError("User not found", req.ip);

    res.status(HttpStatusCode.Ok).send({ user: userUpdated });
  }
}
