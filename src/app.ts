import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import NotFoundError from './utils/errors/NotFoundError';
import { login, createUser } from './controllers/users';
import cardsRouter from './routes/cards';
import usersRouter from './routes/users';
import auth from './middlewares/auth';
import { signUpValidation, signInValidation } from './validator/validators';
import { requestLogger, errorLogger } from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';

const { PORT = 3000 } = process.env;
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(express.json());
app.use(requestLogger);

app.post('/signin', signInValidation, login);
app.post('/signup', signUpValidation, createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(() => {
  throw new NotFoundError('Ошибка 404');
});

app.use(errorLogger); // подключаем логер ошибок

app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // eslint-disable-line
});
