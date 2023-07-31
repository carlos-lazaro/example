import { Pagination } from "../../common/entities";
import { User } from "../entities";

export type getUsersMethod = (
  pagination: Pagination
) => Promise<[User[], number]>;
