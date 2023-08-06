export interface LogMessage {
  message: string;
  context: Record<string, unknown>;
  [key: string]: unknown;
}
