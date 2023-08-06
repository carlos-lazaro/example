import * as Awilix from "awilix";

import { App } from "../interfaces";
import { TypeormDatabase, TypeormRegisterRepository } from "../module";
import { Plugin } from "./interfaces";

export class TypeormPlugin implements Plugin {
  private registers: TypeormRegisterRepository<any>[];
  private entities: any[];

  constructor(dependencies?: {
    registers?: TypeormRegisterRepository<any>[];
    entities?: any[];
  }) {
    this.registers = dependencies?.registers || [];
    this.entities = dependencies?.entities || [];
  }

  async use(dependencies: App): Promise<void> {
    dependencies.logger.info("Starting Typeorm Plugin...");

    const database = new TypeormDatabase({
      env: dependencies.env,
      logger: dependencies.logger,
      entities: this.entities,
    });

    await database
      .connect()
      .then(() => {
        dependencies.container.register({
          database: Awilix.asValue(database),
        });

        this.registers.forEach((register) => {
          dependencies.container.register({
            [register.repositoryNameContainer]: Awilix.asValue(
              register.getRepository(database.appDataSource)
            ),
          });
        });
      })
      .catch((err) => {
        dependencies.logger.child({ error: err }).info("Error Typeorm Plugin");
      });

    dependencies.logger.info("Finalization Typeorm Plugin...");
  }
}
