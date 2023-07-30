import { Pagination } from "../../common/entities/pagination-entity";
import { User } from "../entities";

export type getUsersMethod = (
  pagination: Pagination
) => Promise<[User[], number]>;
