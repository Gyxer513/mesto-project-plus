import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../utils/types';
import AuthorizationError from '../utils/errors/AutorizationError';

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Нужна авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some key') as any;
  } catch (err) {
    throw new AuthorizationError('Нужна авторизация');
  }
  req.user = payload;
  return next();
};

export default auth;
