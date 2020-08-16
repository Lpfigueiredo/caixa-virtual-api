import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { auth } from '../middlewares/auth'
import { makeAddMovementController } from '../factories/controllers/movement/add-movement/add-movement-controller-factory'

export default (router: Router): void => {
  router.post('/entries', auth, adaptRoute(makeAddMovementController('entry')))
  router.post('/exits', auth, adaptRoute(makeAddMovementController('exit')))
}
