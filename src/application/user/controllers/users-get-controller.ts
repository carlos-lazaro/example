import { NextFunction, Request, Response } from "express";

import {
  Controller,
  HttpStatusCode,
  Logger,
  SchemasConfig,
} from "../../../server";
import { PaginationDto } from "../../shared";
import { UserService } from "../interfaces";

export class UsersGetController implements Controller {
  readonly logger;
  readonly userService;

  constructor(dependencies: { logger: Logger; userService: UserService }) {
    this.logger = dependencies.logger;
    this.userService = dependencies.userService;
  }

  schema(): SchemasConfig | null {
    return { query: PaginationDto.Schema() };
  }

  async run(req: Request, res: Response, next: NextFunction) {
    const pagination = new PaginationDto(req.query as never);

    this.logger
      .child({ pagination })
      .info("Received a request for getting users");

    const [items, count] = await this.userService.getExcludeFields(pagination);

    res.status(HttpStatusCode.Ok).send({
      items: items,
      page: pagination.page,
      count,
    });
  }
}
