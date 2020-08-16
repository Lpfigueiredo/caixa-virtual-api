import { CategoryMongoRepository } from '../../../../../infra/db/mongodb/category/category-mongo-repository'
import { DbLoadCategoryByAccountCategoryId } from '../../../../../data/usecases/category/load-category-by-account-category-id/db-load-category-by-account-category-id'
import { LoadCategoriesByAccountCategoryId } from '../../../../../domain/usecases/category/load-categories-by-account-category-id'

export const makeDbLoadCategoryByAccountCategoryId = (): LoadCategoriesByAccountCategoryId => {
  const categoryMongoRepository = new CategoryMongoRepository()
  return new DbLoadCategoryByAccountCategoryId(categoryMongoRepository)
}
