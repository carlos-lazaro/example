import { UserId } from "../../user";
import { AuthLogin } from "../entities";

export type authLoginMethod = (authLogin: AuthLogin) => Promise<UserId | null>;
