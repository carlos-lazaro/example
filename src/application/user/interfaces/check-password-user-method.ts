import { LoginEmailDto } from "../../authentication";
import { User } from "../entities";

export type checkUserPasswordMethod = (
  loginEmailDto: LoginEmailDto
) => Promise<User | null>;

export type checkUserPasswordExcludeFieldsMethod = (
  loginEmailDto: LoginEmailDto,
  toExclude?: (keyof User)[]
) => Promise<Partial<User> | null>;
