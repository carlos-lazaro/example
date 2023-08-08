import * as Awilix from "awilix";

import { App, AppDependencies } from "../../server";
import {
  UserCreateController,
  UserDeleteController,
  UserGetByIdController,
  UsersGetController,
  UserUpdateController,
} from "./controllers";
import { UserRepositoryImplement } from "./user-repository-implement";
import { UserServiceImplement } from "./user-service-implement";

export const userRegisterDependencies: AppDependencies = async (
  dependencies: App
) => {
  dependencies.logger.info("Registration of user dependencies...");

  dependencies.container.register({
    userRepository: Awilix.asClass(UserRepositoryImplement).singleton(),
    userService: Awilix.asClass(UserServiceImplement).singleton(),
    userCreateController: Awilix.asClass(UserCreateController).singleton(),
    userDeleteController: Awilix.asClass(UserDeleteController).singleton(),
    userGetByIdController: Awilix.asClass(UserGetByIdController).singleton(),
    usersGetController: Awilix.asClass(UsersGetController).singleton(),
    userUpdateController: Awilix.asClass(UserUpdateController).singleton(),
  });

  dependencies.logger.info("Registration of user dependencies completed!");
};
