import * as Awilix from "awilix";

const container = Awilix.createContainer({
  injectionMode: Awilix.InjectionMode.PROXY,
});

export { container };
