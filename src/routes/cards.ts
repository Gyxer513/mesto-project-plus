import { Router } from 'express';
import {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} from '../controllers/cards';
import { validateCreateCard, validateIdCard } from '../validator/validators';

const cardsRouter = Router();

cardsRouter
  .get('/', getCards)
  .post('/', validateCreateCard, createCard)
  .delete('/:cardId', validateIdCard, deleteCard)
  .put('/:cardId/likes', validateIdCard, likeCard)
  .delete('/:cardId/likes', validateIdCard, dislikeCard);

export default cardsRouter;
