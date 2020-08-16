import { Controller } from '../../../../../presentation/protocols'
import { AddMovementController } from '../../../../../presentation/controllers/movement/add-movement/add-movement-controller'
import { makeDbAddMovement } from '../../../usecases/movement/add-movement/db-add-movement-factory'
import { makeDbLoadCategoryByAccountCategoryId } from '../../../../../main/factories/usecases/category/load-category-by-account-category-id/load-category-by-account-category-id-factory'

export const makeAddMovementController = (type: string): Controller => {
  return new AddMovementController(makeDbLoadCategoryByAccountCategoryId(), makeDbAddMovement(), type)
}
