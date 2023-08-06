import express from "express";

import {
  App,
  BaseRouter,
  catchAsyncErrors,
  handleRequest,
  RouterApp,
} from "../../server";

class UserRouterApp extends BaseRouter implements RouterApp {
  readonly router;

  constructor() {
    super({ path: "/user" });

    this.router = express.Router();

    this.router.get("/", catchAsyncErrors(handleRequest("usersGetController")));

    this.router.get(
      "/:id",
      catchAsyncErrors(handleRequest("userGetByIdController"))
    );

    this.router.post(
      "/",
      catchAsyncErrors(handleRequest("userCreateController"))
    );

    this.router.patch(
      "/:id",
      catchAsyncErrors(handleRequest("userUpdateController"))
    );

    this.router.delete(
      "/:id",
      catchAsyncErrors(handleRequest("userDeleteController"))
    );
  }

  async use(dependencies: App): Promise<void> {
    dependencies.app.use(this.getFullPath(), this.router);
  }
}

export const userRouterApp = new UserRouterApp();
