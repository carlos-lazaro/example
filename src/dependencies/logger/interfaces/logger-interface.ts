import { LogMethod } from "./log-method-interface";

export interface Logger {
  debug: LogMethod;
  info: LogMethod;
  error: LogMethod;
  child: (options: any) => Logger;
}
