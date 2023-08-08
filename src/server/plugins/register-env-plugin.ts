import * as Awilix from "awilix";

import { Env } from "../config";
import { App } from "../interfaces";
import { Plugin } from "./interfaces";

export class RegisterEnvPlugin implements Plugin {
  private env;

  constructor(dependencies: { env: Env }) {
    this.env = dependencies.env;
  }

  async use(dependencies: App): Promise<void> {
    dependencies.logger.info("Starting Env Plugin...");

    dependencies.container.register({
      env: Awilix.asValue(this.env),
    });

    dependencies.logger.info("Finalization Env Plugin...");
  }
}
