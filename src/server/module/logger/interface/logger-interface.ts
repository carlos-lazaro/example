import { LogMethod } from "./log-method-interface";

export interface Logger {
  debug: LogMethod;
  info: LogMethod;
  warn: LogMethod;
  error: LogMethod;
  fatal: LogMethod;
  child: (bindings: Record<string, unknown>) => Logger;
}
