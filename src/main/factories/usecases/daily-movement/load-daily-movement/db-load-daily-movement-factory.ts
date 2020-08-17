import { MovementMongoRepository } from '../../../../../infra/db/mongodb/movement/movement-mongo-repository'
import { LoadDailyMovement } from '../../../../../domain/usecases/daily-movement/load-daily-movement'
import { DbLoadDailyMovement } from '../../../../../data/usecases/daily-movement/load-daily-movement/db-load-daily-movement'
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/account-mongo-repository'

export const makeDbLoadDailyMovement = (): LoadDailyMovement => {
  const movementMongoRepository = new MovementMongoRepository()
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadDailyMovement(movementMongoRepository, accountMongoRepository)
}
