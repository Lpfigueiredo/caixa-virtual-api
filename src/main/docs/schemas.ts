import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  signUpParamsSchema
} from './schemas/'

export default {
  account: accountSchema,
  signUpParams: signUpParamsSchema,
  loginParams: loginParamsSchema,
  error: errorSchema
}
