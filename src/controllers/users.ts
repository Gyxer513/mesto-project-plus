import { Response, Request } from 'express';
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
    res.status(500).send({ message: 'ошибка сервера' });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const {
      name, about, avatar, email,
    } = req.body;
    await User.create({
      name, about, avatar, email,
    });
    return res.status(200).send({ message: 'Пользователь создан' });
  } catch (error) {
    res.status(500).send({ message: 'ошибка сервера' });
  }
};

export { getUsers, getUserById, createUser };
