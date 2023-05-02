import { Schema, model } from 'mongoose';
import {
  DEFAULT_AVATAR, DEFAULT_NAME, DEFAULT_ABOUT_DATA, urlRegex, emailRegex,
} from '../utils/constants';

export type TUser = {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
};

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    minlength: [2, 'Поле должно содержать больше 2 символов'],
    maxlength: [30, 'Поле должно содержать менее 30 символов'],
    default: DEFAULT_NAME,
  },
  about: {
    type: String,
    minlength: [2, 'Поле должно содержать больше 2 символов'],
    maxlength: [30, 'Поле должно содержать менее 30 символов'],
    default: DEFAULT_ABOUT_DATA,
  },
  avatar: {
    type: String,
    minlength: [2, 'Поле должно содержать больше 2 символов'],
    maxlength: [200, 'Поле должно содержать менее 200 символов'],
    default: DEFAULT_AVATAR,
    validate: {
      validator: (value: string) => urlRegex.test(value),
      message: 'Wrong Link',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => emailRegex.test(value),
      message: 'Wrong Email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export default model<TUser>('User', userSchema);
