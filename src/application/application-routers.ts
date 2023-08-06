import { authenticationRouterApp } from "./authentication";
import { healthRouterApp } from "./health";
import { userRouterApp } from "./user";

export const applicationsRouters = [
  authenticationRouterApp,
  healthRouterApp,
  userRouterApp,
];
