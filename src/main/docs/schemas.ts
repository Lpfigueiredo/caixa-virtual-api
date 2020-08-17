import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  signUpParamsSchema,
  addCategoryParamsSchema
} from './schemas/'

export default {
  account: accountSchema,
  signUpParams: signUpParamsSchema,
  loginParams: loginParamsSchema,
  categoryParams: addCategoryParamsSchema,
  error: errorSchema
}
