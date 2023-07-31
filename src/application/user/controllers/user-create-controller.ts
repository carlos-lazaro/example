import { NextFunction, Request, Response } from "express";

import { Logger } from "../../../core";
import { SchemasConfig } from "../../common/middleware/schema-validation-middleware";
import { User } from "../entities";
import { UserService } from "../interfaces";
import { Controller } from "../interfaces/controller-interface";

export class UserCreateController implements Controller {
  readonly logger;
  readonly userService;

  constructor(dependencies: { logger: Logger; userService: UserService }) {
    this.logger = dependencies.logger;
    this.userService = dependencies.userService;
  }

  schema(): SchemasConfig | null {
    return { body: User.Schema() };
  }

  async run(req: Request, res: Response, next: NextFunction) {
    const user = new User(req.body);

    this.logger.child({ user }).info("Received a request for save user");

    const response = await this.userService.create(user);

    res.status(201).send(response);
  }
}
