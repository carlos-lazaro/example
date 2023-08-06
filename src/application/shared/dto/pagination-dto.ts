import Joi from "joi";

export class PaginationDto {
  readonly page;
  readonly limit;

  constructor(dependencies: { page: number; limit: number }) {
    this.page = dependencies.page || 1;
    this.limit = dependencies.limit || 10;
  }

  public static Schema() {
    return Joi.object({
      page: Joi.number().integer().min(1).optional(),
      limit: Joi.number().integer().min(1).optional(),
    }).and("page", "limit");
  }
}
