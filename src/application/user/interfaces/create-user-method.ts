import { User } from "../entities";

export type createUserMethod = (user: User) => Promise<User>;

export type createUserExcludeFieldsMethod = (
  user: User,
  toExclude?: (keyof User)[]
) => Promise<Partial<User>>;
