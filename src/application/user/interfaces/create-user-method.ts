import { User, UserId } from "../entities";

export type createUserMethod = (user: User) => Promise<UserId>;
