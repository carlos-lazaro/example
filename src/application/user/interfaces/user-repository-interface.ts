import { createUserMethod } from "./create-user-method";
import { deleteUserMethod } from "./delete-user-method";
import { getUserByIdMethod } from "./get-user-by-id-method";
import { getUsersMethod } from "./get-users-method";
import { updateUserMethod } from "./update-user-method";

export interface UserRepository {
  get: getUsersMethod;
  getById: getUserByIdMethod;
  create: createUserMethod;
  update: updateUserMethod;
  delete: deleteUserMethod;
}
