import { DataSource } from "typeorm";

import { ConnectionDatabase, Logger } from "../../../core";
import { Env } from "../../../core/config/interface";
import { User } from "./entities";

export class TypeormDatabase implements ConnectionDatabase {
  readonly env: Env;
  readonly logger: Logger;
  readonly appDataSource: DataSource;

  constructor(dapendencies: { env: Env; logger: Logger }) {
    this.env = dapendencies.env;
    this.logger = dapendencies.logger;

    this.appDataSource = new DataSource({
      type: "mysql",

      host: this.env.mysql.host,
      port: this.env.mysql.port,
      username: this.env.mysql.user,
      password: this.env.mysql.password,
      database: this.env.mysql.database,

      synchronize: true,
      logging: true,

      entities: [User],
      subscribers: [],
      migrations: [],
    });
  }

  async connect(): Promise<void> {
    this.logger.info("⚙️ db connecting");

    await this.appDataSource
      .initialize()
      .then(() => {
        this.logger.info("⚙️ db connected");
      })
      .catch((error) => {
        this.logger.error(`😨 db error, ${error}`);
      })
      .finally(async () => {
        this.logger.info("⚙️ db finally");
      });
  }
}
