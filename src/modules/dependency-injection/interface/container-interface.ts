import { UserDependencyContainer } from "../../../application";
import { AuthDependencyContainer } from "../../../application/auth";
import { Logger } from "../../../core";
import { Env } from "../../../core/config/interface";
import { TypeormDatabase } from "../../plugins";

export interface BaseDependencyContainer {
  env: Env;
  logger: Logger;
  database: TypeormDatabase;
}

export type DependencyContainer = BaseDependencyContainer &
  UserDependencyContainer &
  AuthDependencyContainer;
