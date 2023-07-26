import { Env } from "../../../core/config/interface";
import { Logger } from "../../../interfaces";

export interface DependencyContainer {
  env: Env;
  logger: Logger;
}
