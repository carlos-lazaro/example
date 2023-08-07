import { LoggerLevel } from "../../module";

export interface Env {
  server: {
    port: number;
  };
  mysql: {
    port: number;
    host: string;
    user: string;
    database: string;
    password: string;
  };
  jwt: {
    secret: string;
    duration: string;
  };
  development: boolean;
  production: boolean;
  loggerLevel: LoggerLevel;
}
