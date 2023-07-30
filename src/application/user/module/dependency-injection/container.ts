import * as Awilix from "awilix";

import { Logger } from "../../../../core";
import {
  DependencyContainer,
  getUserTypeormRepository,
} from "../../../../modules";
import UserCreateController from "../../controllers/user-create-controller";
import UserDeleteController from "../../controllers/user-delete-controller";
import UserGetByIdController from "../../controllers/user-get-by-id-controller";
import UserUpdateController from "../../controllers/user-update-controller";
import UsersGetController from "../../controllers/users-get-controller";
import { UserRepository } from "../../user-repository";
import { UserService } from "../../user-service";

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
    userService: Awilix.asClass(UserService).singleton(),
    userRepository: Awilix.asClass(UserRepository)
      .inject(() => ({
        userTypeormRepository: getUserTypeormRepository(container),
      }))
      .singleton(),
  });
};
