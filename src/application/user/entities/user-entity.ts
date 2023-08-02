import Joi from "joi";

import { Id } from "../../common/entities/id-entity";

interface Dependencies {
  email: string;
  password: string;
  name?: string;
  lastName?: string;
  age?: number;
}

interface DependenciesID extends Dependencies {
  id: number;
}

export class User {
  readonly email;
  readonly password;
  readonly name;
  readonly lastName;
  readonly age;

  constructor(dependencies: Dependencies) {
    this.email = dependencies.email;
    this.password = dependencies.password;
    this.name = dependencies.name;
    this.lastName = dependencies.lastName;
    this.age = dependencies.age;
  }

  public static noSensitiveInformation(user: User | UserId) {
    return { ...user, auth: undefined, password: undefined };
  }

  public static Schema() {
    return Joi.object({
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().required(),
      name: Joi.string().trim().optional(),
      lastName: Joi.string().trim().optional(),
      age: Joi.number().positive().optional(),
    });
  }
}

export class UserId extends User {
  readonly id;

  constructor(dependencies: DependenciesID) {
    super(dependencies);
    this.id = dependencies.id;
  }

  public static Schema() {
    return super.Schema().concat(Id.Schema());
  }
}
