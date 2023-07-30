import { NextFunction, Request, Response } from "express";

import { Logger } from "../../../core";
import { Id } from "../../common/entities/id-entity";
import { SchemasConfig } from "../../common/middleware/schema-validation-middleware";
import { UserService } from "../interfaces";
import { Controller } from "./controller";

export default class UserGetByIdController implements Controller {
  readonly logger;
  readonly userService;

  constructor(dependencies: { logger: Logger; userService: UserService }) {
    this.logger = dependencies.logger;
    this.userService = dependencies.userService;
  }

  schema(): SchemasConfig | null {
    return { params: Id.Schema() };
  }

  async run(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    this.logger.child({ id }).info("Received a request for get user by id");

    const user = await this.userService.getById(id);

    res.status(200).send({ user });
  }
}
