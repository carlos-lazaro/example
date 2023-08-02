import express from "express";

import { catchAsyncErrorsMiddleware } from "../../common";
import { handleRequest } from "./handle-request";

const userRouter = express.Router();

userRouter.get(
  "/",
  catchAsyncErrorsMiddleware(handleRequest("usersGetController"))
);

userRouter.get(
  "/:id",
  catchAsyncErrorsMiddleware(handleRequest("userGetByIdController"))
);

userRouter.post(
  "/",
  catchAsyncErrorsMiddleware(handleRequest("userCreateController"))
);

userRouter.put(
  "/",
  catchAsyncErrorsMiddleware(handleRequest("userUpdateController"))
);

userRouter.delete(
  "/:id",
  catchAsyncErrorsMiddleware(handleRequest("userDeleteController"))
);

export { userRouter };
