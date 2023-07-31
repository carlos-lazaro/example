import Joi from "joi";

import { Id } from "../../common/entities/id-entity";

export class User {
  readonly name;
  readonly lastName;
  readonly age;

  constructor(dependencies: { name: string; lastName: string; age: number }) {
    this.name = dependencies.name;
    this.lastName = dependencies.lastName;
    this.age = dependencies.age;
  }

  public static Schema() {
    return Joi.object({
      name: Joi.string().trim().required(),
      lastName: Joi.string().trim().required(),
      age: Joi.number().positive().required(),
    });
  }
}

export class UserId extends User {
  readonly id;

  constructor(dependencies: {
    id: number;
    name: string;
    lastName: string;
    age: number;
  }) {
    super(dependencies);
    this.id = dependencies.id;
  }

  public static Schema() {
    return super.Schema().concat(Id.Schema());
  }
}
