import { PaginationDto } from "../../shared";
import { User } from "../entities";

export type getUsersMethod = (
  pagination: PaginationDto
) => Promise<[User[], number]>;

export type getUsersExcludeFieldsMethod = (
  pagination: PaginationDto,
  toExclude?: (keyof User)[]
) => Promise<[Partial<User>[], number]>;
