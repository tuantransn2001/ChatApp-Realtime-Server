import { Request, Response } from "express";
import HttpException from "../utils/http.exception";

function errorCatcher(error: HttpException, _: Request, res: Response): void {
  const status = error.status || 500;
  const message = error.message || "Something in sever went wrong";
  res.status(status).send({
    status,
    message,
  });
}

export default errorCatcher;
