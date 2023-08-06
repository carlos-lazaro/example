import cookieParser, { CookieParseOptions } from "cookie-parser";

import { App } from "../../interfaces";
import { Middleware } from "./interface";

export class CookieParserMiddleware implements Middleware {
  readonly secret;
  readonly options;

  constructor(
    secret?: string | string[] | undefined,
    options?: CookieParseOptions
  ) {
    this.secret = secret || undefined;
    this.options = options || {};
  }

  async use(dependencies: App): Promise<void> {
    dependencies.app.use(cookieParser(this.secret, this.options));
  }
}
