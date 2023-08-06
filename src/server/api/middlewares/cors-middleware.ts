import cors, { CorsOptions } from "cors";

import { App } from "../../interfaces";
import { Middleware } from "./interface";

export class CorsMiddleware implements Middleware {
  readonly options;

  constructor(options?: CorsOptions) {
    this.options = options || {};
  }

  async use(dependencies: App): Promise<void> {
    dependencies.app.use(cors(this.options));
  }
}
