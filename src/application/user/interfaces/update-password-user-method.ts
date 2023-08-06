import { User } from "../entities";

export type updateUserPasswordMethod = (
  user: User,
  id: number
) => Promise<User | null>;

export type updateUserExcludePasswordFieldsMethod = (
  user: User,
  id: number,
  toExclude?: (keyof User)[]
) => Promise<Partial<User> | null>;
