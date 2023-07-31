import * as Awilix from "awilix";

import { Logger } from "../../core";
import { DependencyContainer } from "../../modules";
import { getUserTypeormRepository } from "../../modules/plugins/typeorm/entities/user-typeorm";
import {
  UserCreateController,
  UserDeleteController,
  UserGetByIdController,
  UsersGetController,
  UserUpdateController,
} from "./controllers";
import { UserRepositoryImplement } from "./user-repository-implement";
import { UserServiceImplement } from "./user-service-implement";

export const registerUserDependencies = async (
  logger: Logger,
  container: Awilix.AwilixContainer<DependencyContainer>
) => {
  logger.info("⚙️ user dependencies loading...");

  container.register({
    usersGetController: Awilix.asClass(UsersGetController).singleton(),
    userCreateController: Awilix.asClass(UserCreateController).singleton(),
    userGetByIdController: Awilix.asClass(UserGetByIdController).singleton(),
    userUpdateController: Awilix.asClass(UserUpdateController).singleton(),
    userDeleteController: Awilix.asClass(UserDeleteController).singleton(),
    userService: Awilix.asClass(UserServiceImplement).singleton(),
    userRepository: Awilix.asClass(UserRepositoryImplement)
      .inject(() => ({
        userTypeormRepository: getUserTypeormRepository(container),
      }))
      .singleton(),
  });
};
