import { DataSource } from "typeorm";

import { Env } from "../../../config/interface";
import { Logger } from "../../logger";
import { ConnectionDatabase } from "../interface";

export class TypeormDatabase implements ConnectionDatabase {
  readonly env: Env;
  readonly logger: Logger;
  readonly entities: any[];
  readonly appDataSource: DataSource;

  constructor(dapendencies: { env: Env; logger: Logger; entities?: any[] }) {
    this.env = dapendencies.env;
    this.logger = dapendencies.logger;
    this.entities = dapendencies.entities || [];

    this.appDataSource = new DataSource({
      type: "mysql",

      host: this.env.mysql.host,
      port: this.env.mysql.port,
      username: this.env.mysql.user,
      password: this.env.mysql.password,
      database: this.env.mysql.database,

      synchronize: true,
      logging: true,

      entities: this.entities,
      subscribers: [],
      migrations: [],
    });
  }

  async connect(): Promise<void> {
    this.logger.info("Starting db connection");

    await this.appDataSource
      .initialize()
      .then(() => {
        this.logger.info("db connected");
      })
      .catch((err) => {
        this.logger.child({ error: err }).info("DB no connected");
      });

    this.logger.info("Finalization db connection");
  }
}
