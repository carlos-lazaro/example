import * as Awilix from "awilix";

import { Logger } from "../../core";
import { DependencyContainer, getAuthTypeormRepository } from "../../modules";
import { AuthRepositoryImplement } from "./auth-repository-implement";
import { AuthServiceImplement } from "./auth-service-implement";
import { AuthLoginController, AuthRegisterController } from "./controllers";

export const registerAuthDependencies = async (
  logger: Logger,
  container: Awilix.AwilixContainer<DependencyContainer>
) => {
  logger.info("⚙️ auth dependencies loading...");

  container.register({
    authLoginController: Awilix.asClass(AuthLoginController).singleton(),
    authRegisterController: Awilix.asClass(AuthRegisterController).singleton(),
    authService: Awilix.asClass(AuthServiceImplement).singleton(),
    authRepository: Awilix.asClass(AuthRepositoryImplement)
      .inject(() => ({
        authTypeormRepository: getAuthTypeormRepository(container),
      }))
      .singleton(),
  });
};
