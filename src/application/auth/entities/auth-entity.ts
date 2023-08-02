import Joi from "joi";

interface Dependencies {
  passwordRecord: string[];
  accessToken?: string;
  refreshToken?: string;
}

interface DependenciesID extends Dependencies {
  id: number;
}

export class Auth {
  readonly passwordRecord;
  readonly accessToken?;
  readonly refreshToken?;

  constructor(dependencies: Dependencies) {
    this.passwordRecord = dependencies.passwordRecord;
    this.accessToken = dependencies.accessToken;
    this.refreshToken = dependencies.refreshToken;
  }

  public static Schema() {
    return Joi.object({});
  }
}

export class AuthId extends Auth {
  readonly id;
  constructor(dependencies: DependenciesID) {
    super(dependencies);
    this.id = dependencies.id;
  }
}
