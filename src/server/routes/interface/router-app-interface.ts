import { Router } from "express";

import { App } from "../../interfaces";

export interface RouterApp {
  router: Router;
  use: (dependencies: App) => Promise<void>;
}
