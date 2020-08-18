import { celebrate, Segments, Joi } from 'celebrate'

export const signUpValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().max(32).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(32).required(),
    passwordConfirmation: Joi.ref('password')
  })
})
