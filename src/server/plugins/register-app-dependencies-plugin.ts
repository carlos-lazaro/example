import { App } from "../interfaces";
import { AppDependencies, Plugin } from "./interfaces";

export class RegisterAppDependenciesPlugin implements Plugin {
  appDependencies;

  constructor(dependencies: { appDependencies: AppDependencies[] }) {
    this.appDependencies = dependencies.appDependencies;
  }

  async use(dependencies: App): Promise<void> {
    dependencies.logger.info("Registration of application dependencies...");

    for (const appDependency of this.appDependencies) {
      await appDependency(dependencies);
    }

    dependencies.logger.info(
      "Registration of application dependencies completed!"
    );
  }
}
