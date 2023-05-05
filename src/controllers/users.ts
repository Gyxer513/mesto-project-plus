import { Response, Request, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  STATUS_OK,
} from '../utils/codes';
import { CustomRequest } from '../utils/types';
import User from '../models/user';
import NotFoundError from '../utils/errors/NotFoundError';
import BadRequestError from '../utils/errors/BadRequestError';
import RequestError from '../utils/errors/RequestError';
import AuthorizationError from '../utils/errors/AutorizationError';

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});
    return res.status(STATUS_OK.code).send(users);
  } catch (error) {
    return next(error);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    return res.status(STATUS_OK.code).send(user);
  } catch (error) {
    return next(error);
  }
};

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, password, avatar, about, email,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name, avatar, about, email, password: hash,
    })
      .then((user) => {
        res.status(STATUS_OK.code).send({
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
          token: jwt.sign({ _id: user._id }, 'some key', { expiresIn: '7d' }),
        });
      })
      .catch((error) => {
        if (error instanceof Error && error.name === 'ValidationError') {
          return next(new BadRequestError(error.message));
        }
        if (error.code === 11000) {
          return next(new RequestError('Пользователь с таким email уже зарегистрирован'));
        } return next(error);
      });
  }).catch(next);
};

const updateUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const _id = req.user?._id;
    const user = await User.findByIdAndUpdate(_id, req.body, { runValidators: true, new: true });
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    return res.status(STATUS_OK.code).send(user);
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      return next(new BadRequestError(error.message));
    }
    return next(error);
  }
};

const updateAvatar = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const _id = req.user?._id;
    const NewAvatar = req.body.avatar;
    const user = await
    User.findByIdAndUpdate(_id, NewAvatar, { runValidators: true, new: true });
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    return res.status(STATUS_OK.code).send(user);
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      return next(new BadRequestError(error.message));
    }
    return next(error);
  }
};

const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      throw new AuthorizationError('Неверные данные пользователя');
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw new AuthorizationError('Неверный пароль');
      }
      const token = jwt.sign({ _id: user._id }, 'some key', { expiresIn: '7d' });
      return res.cookie('httpOnly', token).status(STATUS_OK.code).send({ token });
    });
  }).catch(next);
};

const getCurrentUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId);
    return res.status(STATUS_OK.code).send(user);
  } catch (error) {
    return next(error);
  }
};

export {
  getUsers, getUserById, createUser, updateUser, updateAvatar, login, getCurrentUser,
};
