import { DbLoadCategory } from '../../../../../data/usecases/category/load-category/db-load-category'
import { CategoryMongoRepository } from '../../../../../infra/db/mongodb/category/category-mongo-repository'

export const makeDbLoadCategory = (): DbLoadCategory => {
  const categoryMongoRepository = new CategoryMongoRepository()
  return new DbLoadCategory(categoryMongoRepository)
}
