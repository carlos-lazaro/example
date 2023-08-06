import { NextFunction, Request, Response } from "express";

import {
  Controller,
  HttpStatusCode,
  Logger,
  NotFoundError,
  SchemasConfig,
} from "../../../server";
import { IdDto } from "../../shared";
import { UserService } from "../interfaces";

export class UserGetByIdController implements Controller {
  readonly logger;
  readonly userService;

  constructor(dependencies: { logger: Logger; userService: UserService }) {
    this.logger = dependencies.logger;
    this.userService = dependencies.userService;
  }

  schema(): SchemasConfig | null {
    return { params: IdDto.Schema() };
  }

  async run(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    this.logger.child({ id }).info("Received a request for get user by id");

    const user = await this.userService.getByOptionsExcludeFields({
      where: { id: id },
    });

    if (!user) throw new NotFoundError("User not found", req.ip);

    res.status(HttpStatusCode.Ok).send({ user: user });
  }
}
