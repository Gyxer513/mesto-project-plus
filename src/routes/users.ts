import { Router } from 'express';
import {
  getUsers, updateUser, updateAvatar, getUserById, getCurrentUser,
} from '../controllers/users';
import { validateRquestUser, avatarValidator, profileValidator } from '../validator/validators';

const usersRouter = Router();

usersRouter
  .get('/', getUsers)
  .get('/me', getCurrentUser)
  .get('/:id', validateRquestUser, getUserById)
  .patch('/me', profileValidator, updateUser)
  .patch('/me/avatar', avatarValidator, updateAvatar);

export default usersRouter;
