import { Router } from 'express';
import {
  getUsers, createUser, updateUser, updateAvatar, getUserById,
} from '../controllers/users';

const usersRouter = Router();

usersRouter
  .get('/', getUsers)
  .get('/:id', getUserById)
  .post('/', createUser)
  .patch('/me', updateUser)
  .patch('/me/avatar', updateAvatar)
  .get('/me', getUserById);

export default usersRouter;
