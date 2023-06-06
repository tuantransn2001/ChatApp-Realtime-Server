import { Request, Response, NextFunction } from "express";
import { User } from "../models";
import { STATUS_CODE, STATUS_MESSAGE } from "../ts/enums/api_enums";
import RestFullAPI from "../utils/apiResponse";

class UserController {
  public static async searchUserByName(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name } = req.query;

      const foundUserList = await User.find(
        {
          firstName: { $regex: name, $options: "i" },
        },
        { id: 1, status: 1, firstName: 1, lastName: 1, type: 1, avatar: 1 }
      );

      res
        .status(STATUS_CODE.STATUS_CODE_200)
        .send(
          RestFullAPI.onSuccess(
            STATUS_CODE.STATUS_CODE_200,
            STATUS_MESSAGE.SUCCESS,
            foundUserList
          )
        );
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
