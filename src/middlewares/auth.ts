import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../utils/types';
import { UNAUTHORIZED } from '../utils/errors';

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    const error = new Error(`${UNAUTHORIZED.message}`);
    throw error;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some key') as any;
  } catch (err) {
    const error = new Error(`Ошибка ${err}`);
    throw error;
  }
  req.user = payload;
  return next();
};

export default auth;
