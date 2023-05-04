import { Router } from 'express';
import {
  getUsers, createUser, updateUser, updateAvatar, getUserById,
} from '../controllers/users';
import { validateRquestUser, validateCreateUser } from '../validator/validators';

const usersRouter = Router();

usersRouter
  .get('/', getUsers)
  .get('/me', getUserById)
  .get('/:id', validateRquestUser, getUserById)
  .post('/', validateCreateUser, createUser)
  .patch('/me', updateUser)
  .patch('/me/avatar', updateAvatar);

export default usersRouter;
