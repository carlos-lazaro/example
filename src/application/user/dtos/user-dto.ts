import Joi from "joi";

import { User } from "../entities";

export class UserDto {
  readonly email;
  readonly password;
  readonly name;
  readonly lastName;
  readonly age;

  static fieldsToExlcude: (keyof User)[] = ["password", "authentication"];

  constructor(dependencies: {
    email: string;
    password: string;
    name?: string;
    lastName?: string;
    age?: number;
  }) {
    this.email = dependencies.email;
    this.password = dependencies.password;
    dependencies.name && (this.name = dependencies.name);
    dependencies.lastName && (this.lastName = dependencies.lastName);
    dependencies.age && (this.age = dependencies.age);
  }

  public static excludeFields(
    user: User,
    toExclude: (keyof User)[] = UserDto.fieldsToExlcude
  ): Partial<User> {
    const filteredUser: Partial<User> = { ...user };

    for (const key of toExclude) {
      delete filteredUser[key];
    }

    return filteredUser;
  }

  public static Schema() {
    return Joi.object({
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(6).required(),
      name: Joi.string().trim().optional(),
      lastName: Joi.string().trim().optional(),
      age: Joi.number().integer().positive().optional(),
    });
  }
}
