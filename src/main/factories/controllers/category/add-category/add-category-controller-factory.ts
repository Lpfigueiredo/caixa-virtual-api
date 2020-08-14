import { Controller } from '../../../../../presentation/protocols'
import { AddCategoryController } from '../../../../../presentation/controllers/category/add-category/add-category-controller'
import { makeDbAddCategory } from '../../../usecases/category/add-category/db-add-category-factory'

export const makeAddCategoryController = (): Controller => {
  return new AddCategoryController(makeDbAddCategory())
}
