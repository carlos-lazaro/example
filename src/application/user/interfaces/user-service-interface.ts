import {
  createUserExcludeFieldsMethod,
  createUserMethod,
} from "./create-user-method";
import { deleteUserMethod } from "./delete-user-method";
import {
  getUserByOptionsExcludeFieldsMethod,
  getUserByOptionsMethod,
} from "./get-user-by-method";
import {
  getUsersExcludeFieldsMethod,
  getUsersMethod,
} from "./get-users-method";
import {
  updateUserExcludePasswordFieldsMethod,
  updateUserPasswordMethod,
} from "./update-password-user-method";
import {
  updateUserExcludeFieldsMethod,
  updateUserMethod,
} from "./update-user-method";

export interface UserService {
  /**
   * This function creates the user, but first encrypts the password.
   */
  create: createUserMethod;
  createExcludeFields: createUserExcludeFieldsMethod;
  delete: deleteUserMethod;
  get: getUsersMethod;
  getExcludeFields: getUsersExcludeFieldsMethod;
  getByOptions: getUserByOptionsMethod;
  getByOptionsExcludeFields: getUserByOptionsExcludeFieldsMethod;
  /**
   * This function updates the user fields but not his password.
   */
  update: updateUserMethod;
  updateExcludeFields: updateUserExcludeFieldsMethod;
  /**
   * This function updates the user fields, but first encrypts the password.
   */
  updatePassword: updateUserPasswordMethod;
  updatePasswordExcludeFields: updateUserExcludePasswordFieldsMethod;
}
