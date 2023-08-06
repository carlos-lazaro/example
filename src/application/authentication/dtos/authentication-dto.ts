import Joi from "joi";

export class AuthenticationDto {
  provider: string;
  providerId: string;

  constructor(dependencies: { provider?: string; providerId?: string }) {
    dependencies.provider && (this.provider = dependencies.provider);
    dependencies.providerId && (this.providerId = dependencies.providerId);
  }

  public static Schema() {
    return Joi.object({
      provider: Joi.string().trim().optional(),
      providerId: Joi.string().trim().optional(),
    });
  }
}
