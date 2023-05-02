import {  NextFunction,Request, Response } from 'express';
import { CustomError } from 'utils/types';

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { message, statusCode = 500 } = err;

  res.status(statusCode)
    .send({
      message: statusCode === 500 ? 'Ошибка сервера' : message,
    });
};

export default errorHandler;