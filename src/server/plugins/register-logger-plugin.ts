import * as Awilix from "awilix";

import { App } from "../interfaces";
import { Plugin } from "./interfaces";

export class RegisterLoggerPlugin implements Plugin {
  async use(dependencies: App): Promise<void> {
    dependencies.logger.info("Starting Logger Plugin...");

    dependencies.container.register({
      logger: Awilix.asValue(dependencies.logger),
    });

    dependencies.logger.info("Finalization Logger Plugin...");
  }
}
