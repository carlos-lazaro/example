import * as Awilix from "awilix";
import express from "express";

import { Env } from "../config/interface";
import { Logger } from "../module";

export interface App {
  app: express.Application;
  start: () => Promise<void>;
  env: Env;
  port: number;
  container: Awilix.AwilixContainer;
  logger: Logger;
  // errorHandler: ErrorHandler;
  close: () => void;
}
