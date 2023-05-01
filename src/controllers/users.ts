import { Response, Request } from 'express';
import mongoose from 'mongoose';
import {
  STATUS_OK, BAD_REQUEST, SERVER_ERROR, NOT_FOUND,
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
    const { Id } = req.params;
    const user = await User.findById(Id);
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
    }, { runValidators: true });
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
    const user = await User.findByIdAndUpdate(_id, req.body, { runValidations: true, new: true });
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
    const NewAvatar = req.body;
    const user = await
    User.findByIdAndUpdate(_id, { ...req.body, NewAvatar }, { runValidations: true, new: true });
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

export {
  getUsers, getUserById, createUser, updateUser, updateAvatar,
};
