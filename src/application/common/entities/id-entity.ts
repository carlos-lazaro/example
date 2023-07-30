import Joi from "joi";

export class Id {
  public static Schema() {
    return Joi.object({
      id: Joi.number().positive().required(),
    });
  }
}
