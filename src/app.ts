import express, { Response } from 'express';
import mongoose from 'mongoose';
import { login, createUser } from './controllers/users';
import { CustomRequest } from './utils/types';
import { NOT_FOUND } from './utils/errors';
import cardsRouter from './routes/cards';
import usersRouter from './routes/users';
import auth from './middlewares/auth';

const { PORT = 3000 } = process.env;
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req: CustomRequest, res: Response) => {
  res.status(NOT_FOUND.code).send(NOT_FOUND.message);
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // eslint-disable-line
});
