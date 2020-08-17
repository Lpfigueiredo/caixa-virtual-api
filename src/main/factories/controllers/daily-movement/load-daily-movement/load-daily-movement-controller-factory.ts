import { Controller } from '../../../../../presentation/protocols'
import { LoadDailyMovementController } from '../../../../../presentation/controllers/daily-movement/load-daily-movement/load-daily-movement-controller'
import { makeDbLoadDailyMovement } from '../../../usecases/daily-movement/load-daily-movement/db-load-daily-movement-factory'

export const makeLoadDailyMovementController = (): Controller => {
  return new LoadDailyMovementController(makeDbLoadDailyMovement())
}
