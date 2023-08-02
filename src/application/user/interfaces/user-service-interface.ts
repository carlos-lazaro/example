import { createUserMethod } from "./create-user-method";
import { deleteUserMethod } from "./delete-user-method";
import { getUserByMethod } from "./get-user-by-method";
import { getUsersMethod } from "./get-users-method";
import { updateUserMethod } from "./update-user-method";

export interface UserService {
  create: createUserMethod;
  delete: deleteUserMethod;
  get: getUsersMethod;
  getBy: getUserByMethod;
  update: updateUserMethod;
}
