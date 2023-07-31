import { User } from "../entities";

export type getUserByIdMethod = (id: number) => Promise<User | null>;
