import UserCreateController from "../../../controllers/user-create-controller";
import UserDeleteController from "../../../controllers/user-delete-controller";
import UserGetByIdController from "../../../controllers/user-get-by-id-controller";
import UserUpdateController from "../../../controllers/user-update-controller";
import UsersGetController from "../../../controllers/users-get-controller";
import { UserRepository } from "../../../interfaces";
import { UserService } from "../../../user-service";

export interface UserDependencyContainer {
  usersGetController: UsersGetController;
  userCreateController: UserCreateController;
  userGetByIdController: UserGetByIdController;
  userUpdateController: UserUpdateController;
  userDeleteController: UserDeleteController;
  userRepository: UserRepository;
  userService: UserService;
}
