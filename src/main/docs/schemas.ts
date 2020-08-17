import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  signUpParamsSchema,
  addCategoryParamsSchema,
  categorySchema,
  categoriesSchema,
  addEntryParamsSchema
} from './schemas/'

export default {
  account: accountSchema,
  signUpParams: signUpParamsSchema,
  loginParams: loginParamsSchema,
  categoryParams: addCategoryParamsSchema,
  category: categorySchema,
  categories: categoriesSchema,
  addEntryParams: addEntryParamsSchema,
  error: errorSchema
}
