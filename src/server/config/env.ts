import { config } from "dotenv";
config();

import { LoggerLevel } from "../module";
import { Environment } from "./constant";
import { Env } from "./interface";

const isNodeEnv = (env: Environment): boolean => process.env.NODE_ENV === env;
const isActive = (env: string | undefined): boolean => {
  return String(env) === "true";
};

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
    ssl: {
      crt: process.env.SSL_CRT || "",
      key: process.env.SSL_KEY || "",
      isActive: isActive(process.env.SSL_ACTIVE),
    },
  },
  mysql: {
    port: Number(process.env.MYSQL_PORT) || 3606,
    host: process.env.MYSQL_HOST || "",
    user: process.env.MYSQL_USER || "",
    database: process.env.MYSQL_DATABASE || "",
    password: process.env.MYSQL_PASSWORD || "",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "",
    duration: process.env.JWT_DURATION || "",
  },
  development: isNodeEnv(Environment.Development),
  production: isNodeEnv(Environment.Production),
  loggerLevel: getLoggerLevel(),
};
