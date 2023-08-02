import express from "express";

import { catchAsyncErrorsMiddleware } from "../../common";
import { handleRequest } from "./handle-request";

const authRouter = express.Router();

authRouter.post(
  "/signin",
  catchAsyncErrorsMiddleware(handleRequest("authLoginController"))
);

authRouter.post(
  "/signup",
  catchAsyncErrorsMiddleware(handleRequest("authRegisterController"))
);

export { authRouter };
