import { Response, Request, NextFunction } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  STATUS_OK, BAD_REQUEST, SERVER_ERROR, NOT_FOUND, UNAUTHORIZED,
} from '../utils/errors';
import { CustomRequest } from '../utils/types';
import User from '../models/user';

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    return res.status(STATUS_OK.code).send(users);
  } catch (error) {
    return res.status(SERVER_ERROR.code).send(SERVER_ERROR.message);
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      const error = new Error('Пользователь не найден');
      error.name = 'NotFound';
      throw error;
    }
    return res.status(STATUS_OK.code).send(user);
  } catch (error) {
    if (error instanceof Error && error.name === 'NotFound') {
      return res.status(NOT_FOUND.code).send(NOT_FOUND.message);
    }
    if (error instanceof mongoose.Error.CastError) {
      return res.status(BAD_REQUEST.code).send(BAD_REQUEST.message);
    }
    return res.status(SERVER_ERROR.code).send(SERVER_ERROR.message);
  }
};

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, password, avatar, about, email
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
      .catch(next);
  }).catch(next);
};

const updateUser = async (req: CustomRequest, res: Response) => {
  try {
    const _id = req.user?._id;
    const user = await User.findByIdAndUpdate(_id, req.body, { runValidators: true, new: true });
    if (!user) {
      const error = new Error('Пользователь не найден');
      error.name = 'NotFound';
      throw error;
    }
    return res.status(STATUS_OK.code).send(user);
  } catch (error) {
    if (error instanceof Error && error.name === 'NotFound') {
      return res.status(NOT_FOUND.code).send(NOT_FOUND.message);
    }
    if (error instanceof Error && error.name === 'ValidationError') {
      return res.status(BAD_REQUEST.code).send(BAD_REQUEST.message);
    }
    return res.status(SERVER_ERROR.code).send(SERVER_ERROR.message);
  }
};

const updateAvatar = async (req: CustomRequest, res: Response) => {
  try {
    const _id = req.user?._id;
    const NewAvatar = req.body.avatar;
    const user = await
    User.findByIdAndUpdate(_id, NewAvatar, { runValidators: true, new: true });
    if (!user) {
      const error = new Error('Пользователь не найден');
      error.name = 'NotFound';
      throw error;
    }
    return res.status(STATUS_OK.code).send(user);
  } catch (error) {
    if (error instanceof Error && error.name === 'NotFound') {
      return res.status(NOT_FOUND.code).send(NOT_FOUND.message);
    }
    if (error instanceof Error && error.name === 'ValidationError') {
      return res.status(BAD_REQUEST.code).send(BAD_REQUEST.message);
    }
    return res.status(SERVER_ERROR.code).send(SERVER_ERROR.message);
  }
};

const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      return res.status(BAD_REQUEST.code).send(BAD_REQUEST.message);
    }
    bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return res.status(UNAUTHORIZED.code).send(UNAUTHORIZED.message);
      }
      const token = jwt.sign({ _id: user._id }, 'some key', { expiresIn: '7d' });
      return res.cookie('httpOnly', token).status(STATUS_OK.code).send({ token });
    });
    return res.status(STATUS_OK.code);
  }).catch((err) => res.status(UNAUTHORIZED.code).send({ message: err.message }));
};

const getUser = async (req: CustomRequest, res: Response) => {
  try {
    const user = User.findOne({ _id: req.user?._id });
    if (!user) {
      const error = new Error('Пользователь не найден');
      error.name = 'NotFound';
      throw error;
    }
    return res.send(user);
  } catch (error) {
    if (error instanceof Error && error.name === 'NotFound') {
      return res.status(NOT_FOUND.code).send(NOT_FOUND.message);
    }
    if (error instanceof Error && error.name === 'ValidationError') {
      return res.status(BAD_REQUEST.code).send(BAD_REQUEST.message);
    }
    return res.status(SERVER_ERROR.code).send(SERVER_ERROR.message);
  }
};

export {
  getUsers, getUserById, createUser, updateUser, updateAvatar, login, getUser,
};
