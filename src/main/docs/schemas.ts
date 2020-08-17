import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  signUpParamsSchema,
  addCategoryParamsSchema,
  categorySchema,
  categoriesSchema,
  addMovementParamsSchema
} from './schemas/'

export default {
  account: accountSchema,
  signUpParams: signUpParamsSchema,
  loginParams: loginParamsSchema,
  categoryParams: addCategoryParamsSchema,
  category: categorySchema,
  categories: categoriesSchema,
  addMovementParams: addMovementParamsSchema,
  error: errorSchema
}
