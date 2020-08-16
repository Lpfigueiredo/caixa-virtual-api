import { celebrate, Segments, Joi } from 'celebrate'

export const addMovementValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    categoryId: Joi.string().required(),
    value: Joi.number().min(0).precision(2).required(),
    description: Joi.string().required()
  })
})
