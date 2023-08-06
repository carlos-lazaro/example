import { User } from "../entities";

export type updateUserMethod = (user: User, id: number) => Promise<User | null>;

export type updateUserExcludeFieldsMethod = (
  user: User,
  id: number,
  toExclude?: (keyof User)[]
) => Promise<Partial<User> | null>;
