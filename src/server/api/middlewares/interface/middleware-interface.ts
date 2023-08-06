import { App } from "../../../interfaces";

export interface Middleware {
  use: (dependencies: App) => Promise<void>;
}
