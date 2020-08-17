import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  signUpParamsSchema,
  addCategoryParamsSchema,
  categorySchema,
  categoriesSchema,
  addMovementParamsSchema,
  dailyMovementSchema,
  movementSchema,
  badRequestSchema,
  validationSchema
} from './schemas/'

export default {
  account: accountSchema,
  signUpParams: signUpParamsSchema,
  loginParams: loginParamsSchema,
  categoryParams: addCategoryParamsSchema,
  category: categorySchema,
  categories: categoriesSchema,
  addMovementParams: addMovementParamsSchema,
  dailyMovement: dailyMovementSchema,
  movement: movementSchema,
  badRequest: badRequestSchema,
  validation: validationSchema,
  error: errorSchema
}
