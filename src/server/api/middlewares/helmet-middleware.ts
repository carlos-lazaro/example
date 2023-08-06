import helmet, { HelmetOptions } from "helmet";

import { App } from "../../interfaces";
import { Middleware } from "./interface";

export class HelmetMiddleware implements Middleware {
  readonly options;

  constructor(options?: HelmetOptions) {
    this.options = options || {};
  }

  async use(dependencies: App): Promise<void> {
    dependencies.app.use(helmet(this.options));
  }
}
