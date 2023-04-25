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
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
    },
    owner:{
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
        minlength: 8
      },
    createdAt: {
        type: Date,
      }
  });
  
export const Card = model<TCard>('card', cardSchema);