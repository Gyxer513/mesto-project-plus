import { Response, Request } from 'express';
import {
  STATUS_OK, CREATED, BAD_REQUEST, SERVER_ERROR, NOT_FOUND,
} from '../utils/errors';
import { CustomRequest } from '../utils/types';
import Card from '../models/cards';

const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find({});
    return res.status(STATUS_OK.code).send(cards);
  } catch (error) {
    res.status(SERVER_ERROR.code).send(SERVER_ERROR.message);
  }
};

const createCard = async (req: CustomRequest, res: Response) => {
  try {
    const NewCard = await Card.create({ ...req.body, owner: req.user?._id });
    return res.status(CREATED.code).send(NewCard);
  } catch (error) {
    res.status(SERVER_ERROR.code).send(SERVER_ERROR.message);
  }
};

const deleteCard = async (req: Request, res: Response) => {
  try {
    const card = await Card.deleteOne({ _id: req.params.cardId });
    if (!card) {
      const error = new Error('Карточка не найдена');
      error.name = 'NotFound';
      throw error;
    }
    return res.status(STATUS_OK.code).send({ message: 'карточка удалена' });
  } catch (error) {
    if (error instanceof Error && error.name === 'NotFound') {
      return res.status(NOT_FOUND.code).send(NOT_FOUND.message);
    }
    if (error instanceof Error && error.name === 'ValidationError') {
      return res.status(BAD_REQUEST.code).send(BAD_REQUEST.message);
    }
    if (error instanceof Error && error.name === 'CastError') {
      return res.status(BAD_REQUEST.code).send(BAD_REQUEST.message);
    }
    res.status(SERVER_ERROR.code).send(SERVER_ERROR.message);
  }
};

const likeCard = (req: CustomRequest, res: Response) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user?._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        const error = new Error('Карточка не найдена');
        error.name = 'NotFound';
        throw error;
      }
      return res.status(STATUS_OK.code).send({ data: card });
    }).catch((error) => {
      if (error instanceof Error && error.name === 'NotFound') {
        return res.status(NOT_FOUND.code).send(NOT_FOUND.message);
      }
      if (error instanceof Error && error.name === 'CastError') {
        return res.status(BAD_REQUEST.code).send(BAD_REQUEST.message);
      }
      res.status(SERVER_ERROR.code).send(SERVER_ERROR.message);
    });
};

const dislikeCard = (req: CustomRequest, res: Response) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user?._id } }, // убрать _id из массива
    { new: true },
  ).then((card) => {
    if (!card) {
      const error = new Error('Карточка не найдена');
      error.name = 'NotFound';
      throw error;
    }
    return res.status(STATUS_OK.code).send({ data: card });
  }).catch((error) => {
    if (error instanceof Error && error.name === 'NotFound') {
      return res.status(NOT_FOUND.code).send(NOT_FOUND.message);
    }
    if (error instanceof Error && error.name === 'CastError') {
      return res.status(BAD_REQUEST.code).send(BAD_REQUEST.message);
    }
    res.status(SERVER_ERROR.code).send(SERVER_ERROR.message);
  });
};

export {
  getCards, likeCard, dislikeCard, createCard, deleteCard,
};
