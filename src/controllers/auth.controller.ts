require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import HashStringHandler from "../utils/hashString";
import { User } from "../models";
import jwt from "jsonwebtoken";
import { STATUS_CODE, STATUS_MESSAGE } from "../ts/enums/api_enums";
import RestFullAPI from "../utils/apiResponse";
import { IncomingCustomHeaders } from "../ts/interfaces/global_interfaces";
import { PersonAttributes } from "../ts/interfaces/app_interfaces";
class AuthController {
  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const foundUser = await User.findOne({
        email,
      });
      // ? Check user is exist or not by phone
      if (foundUser) {
        // * Case Exist
        const userDB_PW: string = foundUser.password as string;
        const isMatchPassword: boolean = HashStringHandler.verify(
          password,
          userDB_PW
        );
        switch (isMatchPassword) {
          case true: {
            const { id, firstName, lastName } = foundUser;

            const tokenPayload: {
              id: string | undefined;
              fullName: string | undefined;
            } = {
              id,
              fullName: lastName + " " + firstName,
            };

            const token_expire = "1d";

            const jwtSecretKey: string = process.env
              .JWT_TOKEN_SECRET_KEY as string;
            const token = jwt.sign(tokenPayload, jwtSecretKey, {
              expiresIn: token_expire,
            });

            res.status(STATUS_CODE.STATUS_CODE_200).send(
              RestFullAPI.onSuccess(
                STATUS_CODE.STATUS_CODE_200,
                STATUS_MESSAGE.SUCCESS,
                {
                  access_token: token,
                  expire: token_expire,
                }
              )
            );
            break;
          }
          case false: {
            res.status(STATUS_CODE.STATUS_CODE_401).send(
              RestFullAPI.onSuccess(
                STATUS_CODE.STATUS_CODE_401,
                STATUS_MESSAGE.UN_AUTHORIZE,
                {
                  message: `Client Error & In-valid Token`,
                }
              )
            );
            break;
          }
        }
      } else {
        // * Case does not exist
        res.status(STATUS_CODE.STATUS_CODE_404).send(
          RestFullAPI.onSuccess(
            STATUS_CODE.STATUS_CODE_404,
            STATUS_MESSAGE.NOT_FOUND,
            {
              message: `User with email: ${email} doesn't exist ! Please check it and try again!`,
            }
          )
        );
      }
    } catch (err) {
      next(err);
    }
  }
  public static async me(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.headers as IncomingCustomHeaders;
      const { id: user_id } = jwt.verify(
        token,
        process.env.JWT_TOKEN_SECRET_KEY as string
      ) as {
        id: string;
      };

      const { id, email, lastName, firstName, type, status }: PersonAttributes =
        (await User.findOne({
          id: user_id,
        })) as PersonAttributes;

      res
        .status(STATUS_CODE.STATUS_CODE_200)
        .send(
          RestFullAPI.onSuccess(
            STATUS_CODE.STATUS_CODE_200,
            STATUS_MESSAGE.SUCCESS,
            { id, email, lastName, firstName, type, status }
          )
        );
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
