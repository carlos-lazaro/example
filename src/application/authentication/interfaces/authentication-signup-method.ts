import { User } from "../../user";

export type authenticationSignupMethod = (user: User) => Promise<User | null>;
