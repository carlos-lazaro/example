import { FindOneOptions } from "typeorm";

import { User } from "../entities";

export type getUserByOptionsMethod = (
  options: FindOneOptions<User>
) => Promise<User | null>;

export type getUserByOptionsExcludeFieldsMethod = (
  options: FindOneOptions<User>,
  toExclude?: (keyof User)[]
) => Promise<Partial<User> | null>;
