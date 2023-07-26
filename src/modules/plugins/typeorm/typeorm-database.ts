import { DataSource } from "typeorm";

import { Env } from "../../../core/config/interface";
import { ConnectionDatabase, Logger } from "../../../interfaces";
import { User } from "./entities/User-typeorm";

export class TypeormDatabase implements ConnectionDatabase {
  readonly env: Env;
  readonly logger: Logger;

  constructor(env: Env, logger: Logger) {
    this.env = env;
    this.logger = logger;
  }

  async connect(): Promise<void> {
    this.logger.info("Start db connection");

    const appDataSource = new DataSource({
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

    await appDataSource
      .initialize()
      .then(() => {
        this.logger.info("db connected");
      })
      .catch((error) => {
        this.logger.info(`db error, ${error}`);
      });

    this.logger.info("End db connection");
  }
}
