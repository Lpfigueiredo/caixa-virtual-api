import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { auth } from '../middlewares/auth'
import { makeLoadDailyMovementController } from '../factories/controllers/daily-movement/load-daily-movement/load-daily-movement-controller-factory'
import { loadDailyMovementValidation } from '../middlewares/load-daily-movement-validation'

export default (router: Router): void => {
  router.get('/daily-movement', loadDailyMovementValidation, auth, adaptRoute(makeLoadDailyMovementController()))
}
