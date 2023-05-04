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
import PermissionError from '../utils/errors/PermissionError';
import RequestError from '../utils/errors/RequestError';

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
        if (error.code === 11000) {
          return next(new RequestError('Пользователь с таким email уже зарегистрирован'));
        } return next(error);
      });
  });
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
    return next(error);
  }
};

const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      throw new BadRequestError('Неверные данные пользователя');
    }
    bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw new PermissionError('Неверный пароль');
      }
      const token = jwt.sign({ _id: user._id }, 'some key', { expiresIn: '7d' });
      return res.cookie('httpOnly', token).status(STATUS_OK.code).send({ token });
    });
    return res.status(STATUS_OK.code);
  }).catch(next);
};

export {
  getUsers, getUserById, createUser, updateUser, updateAvatar, login,
};
