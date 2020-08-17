import { MovementMongoRepository } from '../../../../../infra/db/mongodb/movement/movement-mongo-repository'
import { LoadDailyMovement } from '../../../../../domain/usecases/daily-movement/load-daily-movement'
import { DbLoadDailyMovement } from '../../../../../data/usecases/daily-movement/load-daily-movement/db-load-daily-movement'

export const makeDbLoadDailyMovement = (): LoadDailyMovement => {
  const movementMongoRepository = new MovementMongoRepository()
  return new DbLoadDailyMovement(movementMongoRepository)
}
