import * as Awilix from "awilix";

import { env } from "../../core";
import { PinoLogger } from "../plugins";
import { DependencyContainer } from "./interface";

const container = Awilix.createContainer<DependencyContainer>({
  injectionMode: Awilix.InjectionMode.PROXY,
});

container.register({
  env: Awilix.asValue(env),
  logger: Awilix.asClass(PinoLogger).inject(() => env),
});

export { container };
