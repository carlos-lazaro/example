import { NextFunction, Request, Response } from "express";

import { SchemasConfig } from "../../common/middleware/schema-validation-middleware";
import UserCreateController from "./user-create-controller";
import UserDeleteController from "./user-delete-controller";
import UserGetByIdController from "./user-get-by-id-controller";
import UserUpdateController from "./user-update-controller";
import UsersGetController from "./users-get-controller";

export interface Controller {
  run(req: Request, res: Response, next: NextFunction): Promise<void>;
  schema(): SchemasConfig | null;
}

export type HandleRequestMap = {
  usersGetController: UsersGetController;
  userGetByIdController: UserGetByIdController;
  userCreateController: UserCreateController;
  userUpdateController: UserUpdateController;
  userDeleteController: UserDeleteController;
};

export type HandleRequestType = keyof HandleRequestMap;
