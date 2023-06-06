require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { STATUS_CODE, STATUS_MESSAGE } from "../ts/enums/api_enums";
import { IncomingCustomHeaders } from "../ts/interfaces/global_interfaces";
import RestFullAPI from "../utils/apiResponse";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const JWT_TOKEN_SECRET_KEY: string = process.env
      .JWT_TOKEN_SECRET_KEY as string;
    const { token } = req.headers as IncomingCustomHeaders;
    const isAuth = jwt.verify(token, JWT_TOKEN_SECRET_KEY);
    if (isAuth) {
      return next();
    } else {
      res
        .status(STATUS_CODE.STATUS_CODE_401)
        .send(
          RestFullAPI.onSuccess(
            STATUS_CODE.STATUS_CODE_401,
            STATUS_MESSAGE.UN_AUTHORIZE,
            "Client-Error && In-Valid Token"
          )
        );
    }
  } catch (err) {
    res
      .status(STATUS_CODE.STATUS_CODE_401)
      .send(
        RestFullAPI.onSuccess(
          STATUS_CODE.STATUS_CODE_401,
          STATUS_MESSAGE.UN_AUTHORIZE,
          "Client-Error && In-Valid Token"
        )
      );
  }
};
export default authenticate;
