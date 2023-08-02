import { User, UserId } from "../../user";

export type authRegisterMethod = (user: User) => Promise<UserId | null>;
