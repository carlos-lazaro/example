import { Env } from "../config/interface";
import { Logger } from "../dependencies/logger/interfaces/logger-interface";

export interface App {
  app: Express.Application;
  start: () => Promise<void>;
  env?: Env;
  port: number;
  // container: Awilix.AwilixContainer;
  logger: Logger;
  // errorHandler: ErrorHandler;
  close: () => void;
}
