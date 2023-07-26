import { Sequelize } from "sequelize";

import { Env } from "../../../core/config/interface";
import { ConnectionDatabase, Logger } from "../../../interfaces";

export class SequelizeDatabase implements ConnectionDatabase {
  readonly env: Env;
  readonly logger: Logger;

  constructor(env: Env, logger: Logger) {
    this.env = env;
    this.logger = logger;
  }

  async connect(): Promise<void> {
    this.logger.info("Starting Sequelize...");

    const sequelize = new Sequelize(
      this.env.mysql.database,
      this.env.mysql.user,
      this.env.mysql.password,
      {
        host: this.env.mysql.host,
        dialect: "mysql",
        port: this.env.mysql.port,
      }
    );

    await sequelize
      .sync()
      .then(() => {
        this.logger.info("Sequelize connected!");
      })
      .catch((e) => {
        this.logger.error(`Sequelize error, ${e}`);
      });

    this.logger.info("Finalization Sequelize!");
  }
}
