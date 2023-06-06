import { Router } from "express";
import conversationRouter from "./conversation.router";
import authRouter from "./auth.router";
import { authenticate, errorCatcher } from "../middlewares";
import userRouter from "./user.router";
const rootRouter = Router();

rootRouter.use("/conversation", authenticate, conversationRouter, errorCatcher);
rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
export default rootRouter;
