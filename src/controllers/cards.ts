import { NextFunction, Response, Request } from 'express';
import Card from 'models/cards';

const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
};

const likeCard = (req: Request, res: Response) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: (req as any).user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  );

const dislikeCard = (req: Request, res: Response) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: (req as any).user._id } }, // убрать _id из массива
    { new: true }
  );

export { getCards, likeCard, dislikeCard }