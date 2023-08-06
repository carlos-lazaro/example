import Joi from "joi";

export class LoginEmailDto {
  email: string;
  password: string;

  constructor(dependencies: { email: string; password: string }) {
    dependencies.email && (this.email = dependencies.email);
    dependencies.password && (this.password = dependencies.password);
  }

  public static Schema() {
    return Joi.object({
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(6).required(),
    });
  }
}
