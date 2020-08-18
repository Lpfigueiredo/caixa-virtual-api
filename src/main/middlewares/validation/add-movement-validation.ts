import { celebrate, Segments, Joi } from 'celebrate'

export const addMovementValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    value: Joi.number().min(0.01).precision(2).required(),
    description: Joi.string().max(100).required()
  }),
  [Segments.PARAMS]: {
    categoryId: Joi.string().length(24).hex().required()
  }
})
