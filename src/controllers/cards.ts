import { Response, Request, NextFunction } from 'express';
import {
  STATUS_OK, CREATED,
} from '../utils/codes';
import { CustomRequest } from '../utils/types';
import Card from '../models/cards';
import NotFoundError from '../utils/errors/NotFoundError';
import BadRequestError from '../utils/errors/BadRequestError';
import PermissionError from '../utils/errors/PermissionError';

const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({});
    return res.status(STATUS_OK.code).send(cards);
  } catch (error) {
    return next(error);
  }
};

const createCard = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { name, link } = req.body;
    const NewCard = await Card.create(
      { name, link, owner: req.user?._id },
    );
    return res.status(CREATED.code).send(NewCard);
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      throw new BadRequestError(error.message);
    }
    return next(error);
  }
};

const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findById(req.params.cardId, { runValidations: true });
    if (!card) {
      throw new NotFoundError('Пользователь не найден');
    } else if (card.owner.toString() !== req.body!._id.toString()) {
      throw new PermissionError('Можно удалять только свои карточки');
    } else {
      card.delete();
      return res.status(STATUS_OK.code).send({ message: 'карточка удалена' });
    }
  } catch (error) {
    return next(error);
  }
};

const likeCard = (req: CustomRequest, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user?._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      return res.status(STATUS_OK.code).send({ data: card });
    }).catch((error) => next(error));
};

const dislikeCard = (req: CustomRequest, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user?._id } }, // убрать _id из массива
    { new: true },
  ).then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    return res.status(STATUS_OK.code).send({ data: card });
  }).catch((error) => next(error));
};

export {
  getCards, likeCard, dislikeCard, createCard, deleteCard,
};
