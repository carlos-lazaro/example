import { sign } from "jsonwebtoken";

import { Env } from "../../../server";
import { User } from "../../user";

export const generateJsonwebtoken = (user: Partial<User>, env: Env): string => {
  const {
    jwt: { secret, duration },
  } = env;

  return sign(user, secret, { expiresIn: duration });
};
