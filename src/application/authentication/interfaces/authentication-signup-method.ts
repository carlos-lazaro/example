import { User } from "../../user";

export type authenticationSignupMethod = (
  user: User
) => Promise<Partial<User> | null>;
