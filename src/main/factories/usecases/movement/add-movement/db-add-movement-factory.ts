import { AddMovement } from '../../../../../domain/usecases/movement/add-movement/add-movement'
import { MovementMongoRepository } from '../../../../../infra/db/mongodb/movement/movement-mongo-repository'
import { DbAddMovement } from '../../../../../data/usecases/movement/add-movement/db-add-movement'
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/account-mongo-repository'

export const makeDbAddMovement = (): AddMovement => {
  const movementMongoRepository = new MovementMongoRepository()
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddMovement(movementMongoRepository, accountMongoRepository)
}
