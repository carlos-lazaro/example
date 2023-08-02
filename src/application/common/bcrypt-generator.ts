import { compare, hash } from "bcrypt";

export class BcryptGenerator {
  static async ComparePassword(foreing: string, current: string) {
    return await compare(foreing, current);
  }

  static async HashPassword(password: string, salt = 10) {
    return await hash(password, salt);
  }
}
