import express, { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';

const { PORT = 3000 } = process.env;
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
