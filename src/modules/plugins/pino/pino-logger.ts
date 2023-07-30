import pino, { Logger as PinoLoggerType } from "pino";

import { Logger, LogMessage } from "../../../core";
import { Env } from "../../../core/config/interface";

export class PinoLogger implements Logger {
  private readonly logger: PinoLoggerType;

  constructor(env: Env) {
    this.logger = pino({
      enabled: env.development,
      level: env.loggerLevel || "info",
      messageKey: "message",
      base: null,
      timestamp() {
        return ` - Time: ${new Date(Date.now()).toLocaleString("en-US", {
          hour12: false,
          timeZoneName: "short",
          timeZone: "UTC",
        })}`;
      },
    });
  }

  child(bindings: Record<string, unknown>): Logger {
    return this.logger.child(bindings);
  }

  debug(message: LogMessage | string): void {
    this.logger.debug(message);
  }

  error(message: LogMessage | string): void {
    this.logger.error(message);
  }

  fatal(message: LogMessage | string): void {
    this.logger.fatal(message);
  }

  info(message: LogMessage | string): void {
    this.logger.info(message);
  }

  warn(message: LogMessage | string): void {
    this.logger.warn(message);
  }
}
