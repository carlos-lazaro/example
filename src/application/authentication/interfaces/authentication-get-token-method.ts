import { User } from "../../user";

export type authenticationGetTokenMethod = (
  user: Partial<User> | null
) => string | null;
