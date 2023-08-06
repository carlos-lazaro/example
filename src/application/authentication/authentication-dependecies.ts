import * as Awilix from "awilix";

import { App, AppDependencies } from "../../server";
import { AuthenticationRepositoryImplement } from "./authentication-repository-implement";
import { AuthenticationServiceImplement } from "./authentication-service-implement";
import {
  AuthenticationSigninController,
  AuthenticationSignupController,
} from "./controllers";
import { authenticationRegisterRepository } from "./entities";

export const authenticationRegisterDependencies: AppDependencies = async (
  dependencies: App
) => {
  dependencies.logger.info("Registration of authentication dependencies...");

  dependencies.container.register({
    authenticationRepository: Awilix.asClass(AuthenticationRepositoryImplement)
      .inject(() => ({
        authenticationTypeormRepository: dependencies.container.resolve(
          authenticationRegisterRepository.repositoryNameContainer
        ),
      }))
      .singleton(),
    authenticationService: Awilix.asClass(
      AuthenticationServiceImplement
    ).singleton(),
    authenticationSigninController: Awilix.asClass(
      AuthenticationSigninController
    ).singleton(),
    authenticationSignupController: Awilix.asClass(
      AuthenticationSignupController
    ).singleton(),
  });

  dependencies.logger.info(
    "Registration of authentication dependencies completed!"
  );
};
