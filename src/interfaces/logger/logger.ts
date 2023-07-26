export interface LogMessage {
  message: string;
  context: Record<string, unknown>;
  [key: string]: unknown;
}

export type LogMethod = (message: LogMessage | string) => void;

export type Level = "fatal" | "error" | "warn" | "info" | "debug";

export enum LoggerLevel {
  Fatal = "fatal",
  Warn = "warn",
  Debug = "debug",
  Info = "info",
  Error = "error",
}

export interface Logger {
  debug: LogMethod;
  info: LogMethod;
  warn: LogMethod;
  error: LogMethod;
  fatal: LogMethod;
  child: (bindings: Record<string, unknown>) => Logger;
}
