import { Router } from 'express';
import {
  getUsers, getUserById, createUser, updateUser, updateAvatar
} from '../controllers/users';

const usersRouter = Router();

usersRouter
  .get('/', getUsers)
  .get('/:id', getUserById)
  .post('/', createUser)
  .patch('/me', updateUser)
  .patch('/me/avatar', updateAvatar);

export default usersRouter;
