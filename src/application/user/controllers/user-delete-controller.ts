import { NextFunction, Request, Response } from "express";

import { Controller, Logger, SchemasConfig } from "../../../server";
import { IdDto } from "../../shared";
import { UserService } from "../interfaces";

export class UserDeleteController implements Controller {
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

    this.logger.child({ id }).info("Received a request for delete user");

    const rows = await this.userService.delete(id);

    res.status(200).send({ rows });
  }
}
