import express from 'express';
import mongoose from 'mongoose';
import cardsRouter from './routes/cards';
import usersRouter from './routes/users';

const { PORT = 3000 } = process.env;
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(express.json());

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // eslint-disable-line
});
