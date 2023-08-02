import { NextFunction, Request, Response } from "express";

import { Logger } from "../../../core";
import { Pagination } from "../../common/entities";
import { SchemasConfig } from "../../common/middleware/schema-validation-middleware";
import { User } from "../entities";
import { UserService } from "../interfaces";
import { Controller } from "../interfaces/controller-interface";

export class UsersGetController implements Controller {
  readonly logger;
  readonly userService;

  constructor(dependencies: { logger: Logger; userService: UserService }) {
    this.logger = dependencies.logger;
    this.userService = dependencies.userService;
  }

  schema(): SchemasConfig | null {
    return { query: Pagination.Schema() };
  }

  async run(req: Request, res: Response, next: NextFunction) {
    const pagination = new Pagination(req.query as never);

    this.logger
      .child({ pagination })
      .info("Received a request for getting users");

    const [items, count] = await this.userService.get(pagination);

    res.status(200).send({
      items: items.map((data) => User.noSensitiveInformation(data)),
      page: pagination.page,
      count,
    });
  }
}
