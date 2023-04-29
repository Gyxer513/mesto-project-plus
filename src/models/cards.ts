import { Schema, ObjectId, model } from 'mongoose';

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
    required: true,
    default: [],
  },
  createdAt: {
    type: Date,
  },
});

export default model<TCard>('Card', cardSchema);
