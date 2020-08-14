import { celebrate, Segments, Joi } from 'celebrate'

export const signUpValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    passwordConfirmation: Joi.ref('password')
  })
})
