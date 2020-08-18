import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { auth } from '../middlewares/auth'
import { makeAddMovementController } from '../factories/controllers/movement/add-movement/add-movement-controller-factory'
import { addMovementValidation } from '../middlewares/validation/add-movement-validation'

export default (router: Router): void => {
  router.post('/entries/:categoryId', addMovementValidation, auth, adaptRoute(makeAddMovementController('entry')))
  router.post('/exits/:categoryId', addMovementValidation, auth, adaptRoute(makeAddMovementController('exit')))
}
