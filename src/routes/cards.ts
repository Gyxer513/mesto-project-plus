import { Router } from 'express';
import {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} from '../controllers/cards';
import { validateCreateCard, validateDeleteCard } from '../validator/validators';

const cardsRouter = Router();

cardsRouter
  .get('/', getCards)
  .post('/', validateCreateCard, createCard)
  .delete('/:cardId', validateDeleteCard, deleteCard)
  .put('/:cardId/likes', likeCard)
  .delete('/:cardId/likes', dislikeCard);

export default cardsRouter;
