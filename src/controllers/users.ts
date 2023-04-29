import { Response, Request } from 'express';
import mongoose from 'mongoose';
import User from '../models/user';

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: 'ошибка сервера' });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('Пользователь не найден');
      error.name = 'NotFound';
      throw error;
    }
    return res.status(200).send(user);
  } catch (error) {
    if (error instanceof Error && error.name === 'NotFound') {
      return res.status(404).send({ message: error.message });
    }
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).send({ message: 'Запрашиваемый пользователь не найден' });
    }
    res.status(500).send({ message: 'ошибка сервера' });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const {
      name, about, avatar,
    } = req.body;
    if (!name && !about && !avatar) {
      const error = new Error('Переданные данные не корректны');
      error.name = 'CustomValid';
      throw error;
    }
    await User.create({
      name, about, avatar,
    });
    return res.status(200).send({ message: 'Пользователь создан' });
  } catch (error) {
    if (error instanceof Error && error.name === 'CustomValid') {
      res.status(400).send({ message: 'некорректные данные' });
    }
    res.status(500).send({ message: 'ошибка сервера' });
  }
};

export { getUsers, getUserById, createUser };
