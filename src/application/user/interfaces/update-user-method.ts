import { UserId } from "../entities";

export type updateUserMethod = (user: UserId) => Promise<UserId | null>;
