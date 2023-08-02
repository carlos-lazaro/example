import { NextFunction, Request, Response } from "express";

import { Logger } from "../../../core";
import { NotFoundError } from "../../common";
import { SchemasConfig } from "../../common/middleware/schema-validation-middleware";
import { User, UserId } from "../entities";
import { UserService } from "../interfaces";
import { Controller } from "../interfaces/controller-interface";

export class UserUpdateController implements Controller {
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

    this.logger.child({ user }).info("Received a request for update user");

    const userUpdated = await this.userService.update(user);

    if (!userUpdated) throw new NotFoundError("User not found", req.ip);

    res.status(200).send({ user: User.noSensitiveInformation(userUpdated) });
  }
}
