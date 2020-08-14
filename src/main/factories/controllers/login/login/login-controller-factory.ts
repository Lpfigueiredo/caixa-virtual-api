import { Controller } from '../../../../../presentation/protocols'
import { LoginController } from '../../../../../presentation/controllers/login/login/login-controller'
import { makeDbAuthentication } from '../../../usecases/account/authentication/db-authentication-factory'

export const makeLoginController = (): Controller => {
  return new LoginController(makeDbAuthentication())
}
