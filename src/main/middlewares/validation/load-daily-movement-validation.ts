import { celebrate, Segments, Joi } from 'celebrate'

export const loadDailyMovementValidation = celebrate({
  [Segments.QUERY]: {
    date: Joi.date().iso()
  }
})
