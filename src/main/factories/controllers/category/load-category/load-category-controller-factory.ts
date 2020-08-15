import { Controller } from '../../../../../presentation/protocols'
import { LoadCategoryController } from '../../../../../presentation/controllers/category/load-category-by-account-id/load-category-by-account-id-controller'
import { makeDbLoadCategory } from '../../../usecases/category/load-category/db-load-category-factory'

export const makeLoadCategoryController = (): Controller => {
  return new LoadCategoryController(makeDbLoadCategory())
}
