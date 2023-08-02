import { Pagination } from "../../common/entities";
import { UserId } from "../entities";

export type getUsersMethod = (
  pagination: Pagination
) => Promise<[UserId[], number]>;
