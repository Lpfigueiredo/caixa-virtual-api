import { AddCategory } from '../../../../../domain/usecases/category/add-category'
import { CategoryMongoRepository } from '../../../../../infra/db/mongodb/category/category-mongo-repository'
import { DbAddCategory } from '../../../../../data/usecases/category/add-category/db-add-category'

export const makeDbAddCategory = (): AddCategory => {
  const categoryMongoRepository = new CategoryMongoRepository()
  return new DbAddCategory(categoryMongoRepository)
}
