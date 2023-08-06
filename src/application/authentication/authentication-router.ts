import express from "express";

import {
  App,
  BaseRouter,
  catchAsyncErrors,
  handleRequest,
  RouterApp,
} from "../../server";

class AuthenticationRouterApp extends BaseRouter implements RouterApp {
  readonly router;

  constructor() {
    super({ path: "/authentication" });

    this.router = express.Router();

    this.router.post(
      "/signin",
      catchAsyncErrors(handleRequest("authenticationSigninController"))
    );

    this.router.post(
      "/signup",
      catchAsyncErrors(handleRequest("authenticationSignupController"))
    );
  }

  async use(dependencies: App): Promise<void> {
    dependencies.app.use(this.getFullPath(), this.router);
  }
}

export const authenticationRouterApp = new AuthenticationRouterApp();
