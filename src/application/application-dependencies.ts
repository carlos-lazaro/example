import { authenticationRegisterDependencies } from "./authentication";
import { userRegisterDependencies } from "./user";

export const applicationsDependencies = [
  authenticationRegisterDependencies,
  userRegisterDependencies,
];
