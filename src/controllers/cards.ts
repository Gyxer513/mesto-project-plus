import { Response, Request } from 'express';
import Card from '../models/cards';
import { STATUS_OK, SERVER_ERROR } from 'utils/errors';

const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find({});
    return res.status(STATUS_OK.code).send(cards);
  } catch (error) {
    res.status(SERVER_ERROR.code).send(SERVER_ERROR.message);
  }
};

const createCard = async (req: Request, res: Response) => {
  try {
    const NewCard = await Card.create({ ...req.body, owner: (req as any).user._id });
    return res.status(201).send(NewCard);
  } catch (error) {
    res.status(SERVER_ERROR.code).send(SERVER_ERROR.message);
  }
};

const deleteCard = async (req: Request, res: Response) => {
  try {
    await Card.deleteOne({ _id: req.params.cardId });
    return res.status(200).send({ message: 'карточка удалена' });
  } catch (error) {
    res.status(SERVER_ERROR.code).send(SERVER_ERROR.message);
  }
};

const likeCard = (req: Request, res: Response) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: (req as any).user._id } }, // добавить _id в массив, если его там нет
  { new: true },
);

const dislikeCard = (req: Request, res: Response) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: (req as any).user._id } }, // убрать _id из массива
  { new: true },
);

export {
  getCards, likeCard, dislikeCard, createCard, deleteCard,
};
