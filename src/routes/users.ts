import { Router } from 'express';
import {
  getUsers, getUserById, createUser,
} from '../controllers/users';

const usersRouter = Router();

usersRouter
  .get('/', getUsers)
  .get('/:id', getUserById)
  .post('/', createUser);

export default usersRouter;
