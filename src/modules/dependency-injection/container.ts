import * as Awilix from "awilix";

import { env } from "../../core";
import { PinoLogger, TypeormDatabase } from "../plugins";
import { DependencyContainer } from "./interface";

const container = Awilix.createContainer<DependencyContainer>({
  injectionMode: Awilix.InjectionMode.PROXY,
});

container.register({
  env: Awilix.asValue(env),
});

container.register({
  logger: Awilix.asClass(PinoLogger)
    .inject(() => container.resolve("env"))
    .singleton(),
});

container.register({
  database: Awilix.asClass(TypeormDatabase)
    .inject(() => ({
      env: container.resolve("env"),
      logger: container.resolve("logger"),
    }))
    .singleton(),
});

export { container };
