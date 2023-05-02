import { Router } from 'express';
import {
  getUsers, getUserById, createUser, updateUser, updateAvatar, getUser,
} from '../controllers/users';

const usersRouter = Router();

usersRouter
  .get('/', getUsers)
  .get('/:id', getUserById)
  .post('/', createUser)
  .patch('/me', updateUser)
  .patch('/me/avatar', updateAvatar)
  .get('/users/me', getUser);

export default usersRouter;
