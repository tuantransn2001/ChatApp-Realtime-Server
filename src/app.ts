require("dotenv").config();
import express, { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import config from "config";
import cors from "cors";
import logger from "./utils/logger";
import socket from "./socket";
import rootRouter from "../routes";
import mongoose from "mongoose";
import { Conversation, User } from "../models";
import { USER_ARRAY } from "./data/seeder";
// ? ============================== ENV VARIABLES ==================================
const LOCAL_HOST: string = process.env.LOCAL_HOST as string;
const SERVER_HOST: string = process.env.SERVER_HOST as string;
const PORT: string = process.env.PORT as string;
const DB_CONNECT_LINK: string = process.env.DB_CONNECT_LINK as string;
const ROOT_URL: string = process.env.ROOT_URL as string;
const ENVIRONMENT: string = process.env.ENVIRONMENT as string;
// ? ============================== CONFIG VARIABLES =============================
const corsOrigin = config.get<string>("corsOrigin");
// ? ============================== INITIATE SERVER =============================
const app: Express = express();
// ? ============================== ALLOW CORS ==================================
app.use(cors());
app.use(express.json());
// ? ============================== SOCKET SETUP ================================
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});
// ? ================================== ROUTES ===================================
app.use(ROOT_URL, rootRouter);
// ? ============================== RUN SERVER ==================================
mongoose
  .connect(DB_CONNECT_LINK)
  .then(() => {
    server.listen(PORT, async () => {
      logger.info(`Database has been connected`);
      logger.info(
        `🚀 Server is running on ${ENVIRONMENT} 🚀 - http://${
          ENVIRONMENT.toUpperCase() === "PRODUCTION" ? SERVER_HOST : LOCAL_HOST
        }:${PORT}${ROOT_URL}`
      );

      await User.deleteMany();
      await Conversation.deleteMany();
      await User.insertMany(USER_ARRAY);
      socket({ io });
    });
  })
  .catch((err: any) => {
    logger.error(`Can't connect to database`);
    logger.error(`Error: ${err}`);
    process.exit();
  });