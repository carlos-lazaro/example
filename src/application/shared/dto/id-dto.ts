import Joi from "joi";

export class IdDto {
  public static Schema() {
    return Joi.object({
      id: Joi.number().integer().positive().required(),
    });
  }
}
