import { NextFunction, Request, Response } from "express";

import { Logger } from "../../../core";
import { SchemasConfig } from "../../common/middleware/schema-validation-middleware";
import { UserId } from "../entities";
import { UserService } from "../interfaces";
import { Controller } from "./controller";

export default class UserUpdateController implements Controller {
  readonly logger;
  readonly userService;

  constructor(dependencies: { logger: Logger; userService: UserService }) {
    this.logger = dependencies.logger;
    this.userService = dependencies.userService;
  }

  schema(): SchemasConfig | null {
    return { body: UserId.Schema() };
  }

  async run(req: Request, res: Response, next: NextFunction) {
    const user = new UserId(req.body);

    this.logger
      .child({ user })
      .info(`Received a request for update user, ${user}`);

    const response = await this.userService.update(user);

    res.status(201).send(response);
  }
}
