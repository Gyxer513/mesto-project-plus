import { Schema, ObjectId, model } from 'mongoose';
import validator from 'validator';

export type TCard = {
  name: string;
  link: string;
  owner: ObjectId;
  likes: ObjectId[];
  createdAt: Date;
}
const cardSchema = new Schema<TCard>({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Поле должно содержать больше 2 символов'],
    maxlength: [30, 'Поле должно содержать менее 30 символов'],
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isURL(value),
      message: 'Wrong Link',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
  },
});

export default model<TCard>('Card', cardSchema);
