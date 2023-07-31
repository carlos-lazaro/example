import express from "express";

import { catchAsyncErrorsMiddleware, handleRequest } from "../../common";

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
