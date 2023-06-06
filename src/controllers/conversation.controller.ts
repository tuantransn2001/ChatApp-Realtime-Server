import { Request, Response, NextFunction } from "express";
import { Conversation } from "../models";
import RestFullAPI from "../utils/apiResponse";
import { STATUS_CODE, STATUS_MESSAGE } from "../ts/enums/api_enums";
import HttpException from "../utils/http.exception";

class ConversationController {
  public static async getConversationByMembers(req: Request, res: Response) {
    try {
      const { members } = req.body;
      const foundConversation = await Conversation.findOne({
        members: {
          $elemMatch: members[0] && members[1],
        },
      });

      if (foundConversation) {
        res
          .status(STATUS_CODE.STATUS_CODE_200)
          .send(
            RestFullAPI.onSuccess(
              STATUS_CODE.STATUS_CODE_200,
              STATUS_MESSAGE.SUCCESS,
              foundConversation
            )
          );
      } else {
        res
          .status(STATUS_CODE.STATUS_CODE_404)
          .send(
            RestFullAPI.onSuccess(
              STATUS_CODE.STATUS_CODE_404,
              STATUS_MESSAGE.NOT_FOUND,
              "They haven't been chat before!"
            )
          );
      }
    } catch (err) {
      const customErr: HttpException = err as HttpException;

      res
        .status(STATUS_CODE.STATUS_CODE_500)
        .send(RestFullAPI.onFail(STATUS_CODE.STATUS_CODE_500, customErr));
    }
  }
  public static async getContactList(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.query.id;
      const type = req.query.type;

      const foundUserContactList = await Conversation.find({
        members: { $elemMatch: { id, type } },
      });

      res
        .status(STATUS_CODE.STATUS_CODE_200)
        .send(
          RestFullAPI.onSuccess(
            STATUS_CODE.STATUS_CODE_200,
            STATUS_MESSAGE.SUCCESS,
            foundUserContactList
          )
        );
    } catch (err) {
      next(err);
    }
  }
}

export default ConversationController;
