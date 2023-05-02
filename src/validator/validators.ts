import { celebrate, Joi } from 'celebrate';


const signUpValidation = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    })
})

const signInValidation = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    })
})

export { signInValidation, signUpValidation }