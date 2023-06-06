import { Router } from "express";
import UserController from "../controllers/user.controller";
import { errorCatcher } from "../middlewares";

const userRouter = Router();

userRouter.get(
  "/search-by-name",
  UserController.searchUserByName,
  errorCatcher
);

export default userRouter;
