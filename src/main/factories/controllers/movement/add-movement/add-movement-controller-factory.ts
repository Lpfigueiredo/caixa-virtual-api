import { Controller } from '../../../../../presentation/protocols'
import { AddMovementController } from '../../../../../presentation/controllers/movement/add-movement/add-movement-controller'
import { makeDbAddMovement } from '../../../usecases/movement/add-movement/db-add-movement-factory'
import { makeDbLoadCategory } from '../../../usecases/category/load-category/db-load-category-factory'

export const makeAddMovementController = (type: string): Controller => {
  return new AddMovementController(makeDbLoadCategory(), makeDbAddMovement(), type)
}
