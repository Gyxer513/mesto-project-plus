import { Response, Request } from 'express';
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

const createUser = async (req: Request, res: Response) => {
  try {
    const {
      name, about, avatar,
    } = req.body;
    await User.create({
      name, about, avatar,
    });
    return res.status(STATUS_OK.code).send({ message: 'Пользователь создан' });
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      return res.status(BAD_REQUEST.code).send(BAD_REQUEST.message);
    }
    return res.status(SERVER_ERROR.code).send(SERVER_ERROR.message);
  }
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

export const login = (req: Request, res: Response) => {
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
  }).catch((err) => res.status(401).send({ message: err.message }));
};

export {
  getUsers, getUserById, createUser, updateUser, updateAvatar,
};
