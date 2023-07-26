import { config } from "dotenv";
config();

import { LoggerLevel } from "../../interfaces";
import { Environment } from "./constant";
import { Env } from "./interface";

const isNodeEnv = (env: Environment): boolean => process.env.NODE_ENV === env;

const getLoggerLevel = (): LoggerLevel => {
  const loggerLevel = process.env.LOGGER_LEVEL ?? "";
  const loggerLevels: string[] = Object.values(LoggerLevel);

  return loggerLevels.includes(loggerLevel)
    ? (loggerLevel as LoggerLevel)
    : LoggerLevel.Info;
};

export const env: Env = {
  server: {
    port: Number(process.env.PORT) || 3000,
  },
  mysql: {
    port: Number(process.env.MYSQL_PORT) || 3606,
    host: process.env.MYSQL_HOST || "",
    user: process.env.MYSQL_USER || "",
    database: process.env.MYSQL_DATABASE || "",
    password: process.env.MYSQL_PASSWORD || "",
  },
  development: isNodeEnv(Environment.Development),
  production: isNodeEnv(Environment.Production),
  loggerLevel: getLoggerLevel(),
};
