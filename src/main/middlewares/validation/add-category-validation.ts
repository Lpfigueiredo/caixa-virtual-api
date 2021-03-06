import { celebrate, Segments, Joi } from 'celebrate'

export const addCategoryValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().max(32).required()
  })
})
