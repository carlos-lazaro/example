import Joi from "joi";

interface Dependencies {
  email: string;
  password: string;
}

export class AuthLogin {
  readonly email;
  readonly password;

  constructor(dependencies: Dependencies) {
    this.email = dependencies.email;
    this.password = dependencies.password;
  }

  public static Schema() {
    return Joi.object({
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().required(),
    });
  }
}
