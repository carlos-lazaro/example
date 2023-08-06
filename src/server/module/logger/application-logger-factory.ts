import { App } from "../../interfaces";
import { ApplicationLoggerFactory, Logger } from "./interface";
import { PinoLogger } from "./pino";

export const applicationLoggerFactory: ApplicationLoggerFactory = {
  get(dependencies: App): Logger {
    return new PinoLogger(dependencies.env);
  },
};
