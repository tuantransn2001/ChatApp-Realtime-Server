import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { authenticate } from "../middlewares";
const authRouter = Router();

authRouter
  .post("/login", AuthController.login)
  .post("/me", authenticate, AuthController.me);

export default authRouter;
