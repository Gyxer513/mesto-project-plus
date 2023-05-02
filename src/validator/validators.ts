import { celebrate, Joi } from 'celebrate';


const isgnUpValidation = celebrate({
    body: Joi.object().keys({})
})