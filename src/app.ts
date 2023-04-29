import express, { Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { CustomRequest } from 'utils/types';
import cardsRouter from './routes/cards';
import usersRouter from './routes/users';

const { PORT = 3000 } = process.env;
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(express.json());

app.use((req: CustomRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '644c9f32ab4f5dd6eaf52ab8', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // eslint-disable-line
});
