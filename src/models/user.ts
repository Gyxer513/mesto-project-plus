import { Schema, model } from 'mongoose';

export type TUser = {
  name: string;
  about: string;
  avatar: string;
};

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Поле должно содержать больше 2 символов'],
    maxlength: [30, 'Поле должно содержать менее 30 символов'],
  },
  about: {
    type: String,
    required: true,
    minlength: [2, 'Поле должно содержать больше 2 символов'],
    maxlength: [30, 'Поле должно содержать менее 30 символов'],
  },
  avatar: {
    type: String,
    required: true,
    minlength: [2, 'Поле должно содержать больше 2 символов'],
    maxlength: [200, 'Поле должно содержать менее 200 символов'],
  },
});

export default model<TUser>('User', userSchema);
