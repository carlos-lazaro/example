import { FindOneOptions } from "typeorm";

import { UserId } from "../entities";

export type getUserByMethod = (
  options: FindOneOptions<UserId>
) => Promise<UserId | null>;
