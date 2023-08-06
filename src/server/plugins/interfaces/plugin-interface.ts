import { App } from "../../interfaces";

export interface Plugin {
  use: (dependencies: App) => Promise<void>;
}
