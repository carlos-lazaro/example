import {
  UserCreateController,
  UserDeleteController,
  UserGetByIdController,
  UsersGetController,
  UserUpdateController,
} from "../controllers";
import { UserRepository } from "./user-repository-interface";
import { UserService } from "./user-service-interface";

export interface UserDependencyContainer {
  userCreateController: UserCreateController;
  userDeleteController: UserDeleteController;
  userGetByIdController: UserGetByIdController;
  usersGetController: UsersGetController;
  userUpdateController: UserUpdateController;
  userRepository: UserRepository;
  userService: UserService;
}

export type HandleRequestMap = {
  userCreateController: UserCreateController;
  userDeleteController: UserDeleteController;
  userGetByIdController: UserGetByIdController;
  usersGetController: UsersGetController;
  userUpdateController: UserUpdateController;
};

export type HandleRequestType = keyof HandleRequestMap;
