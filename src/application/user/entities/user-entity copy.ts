import Joi from "joi";

import { Id } from "../../common/entities/id-entity";

export class User {
  protected _name;
  protected _lastName;
  protected _age;

  constructor(dependencies: { name: string; lastName: string; age: number }) {
    this._name = dependencies.name;
    this._lastName = dependencies.lastName;
    this._age = dependencies.age;
  }

  public static Schema() {
    return Joi.object({
      name: Joi.string().trim().required(),
      lastName: Joi.string().trim().required(),
      age: Joi.number().positive().required(),
    });
  }

  get name(): string {
    return this._name;
  }

  setName(name: string) {
    this._name = name;
  }

  get lastName(): string {
    return this._lastName;
  }

  setLastName(lastName: string) {
    this._lastName = lastName;
  }

  get age(): number {
    return this._age;
  }

  setAge(age: number) {
    this._age = age;
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
