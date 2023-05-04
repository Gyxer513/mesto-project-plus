import { celebrate, Joi } from 'celebrate';

const signUpValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }),
});

export const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
    owner: Joi.string().required(),
  }),
});

export const validateDeleteCard = celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const validateRquestUser = celebrate({
  body: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

export {
  signInValidation, signUpValidation, validateRquestUser, validateCreateUser,
};
