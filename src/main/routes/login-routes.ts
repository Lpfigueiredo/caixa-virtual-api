import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeSignUpController } from '../factories/controllers/login/signup/signup-controller-factory'
import { signUpValidation } from '../middlewares/signup-validation'

export default (router: Router): void => {
  router.post('/signup', signUpValidation, adaptRoute(makeSignUpController()))
}
