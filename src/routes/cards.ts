import { Router } from 'express';
import {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} from '../controllers/cards';

const cardsRouter = Router();

cardsRouter
  .get('/', getCards)
  .post('/', createCard)
  .delete('/:cardId', deleteCard)
  .put('/:cardId/likes', likeCard)
  .delete('/:cardId/likes', dislikeCard);

export default cardsRouter;
