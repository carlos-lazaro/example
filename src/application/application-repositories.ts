import { authenticationRegisterRepository } from "./authentication";
import { userRegisterRepository } from "./user";

export const applicationsRepositories = [
  authenticationRegisterRepository,
  userRegisterRepository,
];
