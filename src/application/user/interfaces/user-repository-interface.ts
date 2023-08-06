import { createUserMethod } from "./create-user-method";
import { deleteUserMethod } from "./delete-user-method";
import { getUserByOptionsMethod } from "./get-user-by-method";
import { getUsersMethod } from "./get-users-method";
import { updateUserMethod } from "./update-user-method";

export interface UserRepository {
  create: createUserMethod;
  delete: deleteUserMethod;
  get: getUsersMethod;
  getByOptions: getUserByOptionsMethod;
  update: updateUserMethod;
}
