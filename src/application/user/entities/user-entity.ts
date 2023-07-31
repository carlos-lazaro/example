import Joi from "joi";

import { Id } from "../../common/entities/id-entity";

interface Dependencies {
  name: string;
  email: string;
  lastName?: string;
  age?: number;
}

interface DependenciesID extends Dependencies {
  id: number;
}

export class User {
  readonly name;
  readonly email;
  readonly lastName;
  readonly age;

  constructor(dependencies: Dependencies) {
    this.name = dependencies.name;
    this.email = dependencies.email;
    this.lastName = dependencies.lastName;
    this.age = dependencies.age;
  }

  public static Schema() {
    return Joi.object({
      name: Joi.string().trim().required(),
      email: Joi.string().trim().email().required(),
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
