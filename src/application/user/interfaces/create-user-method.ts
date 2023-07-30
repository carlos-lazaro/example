import { User } from "../entities";

export type createUserMethod = (user: User) => Promise<User>;
