import { App } from "../../../interfaces";

export interface ConnectionDatabase {
  connect: () => Promise<void>;
  // connect: (app: App) => Promise<void>;
}
