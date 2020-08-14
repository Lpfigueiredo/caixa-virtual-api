import { AddCategoryRepository } from '../../../../data/protocols/db/category/add-category-repository'
import { AddCategoryModel } from '../../../../domain/usecases/category/add-category'
import { MongoHelper } from '../helpers/mongo-helper'

export class CategoryMongoRepository implements AddCategoryRepository {
  async add (categoryData: AddCategoryModel): Promise<void> {
    const categoryCollection = await MongoHelper.getCollection('categories')
    await categoryCollection.insertOne(categoryData)
  }
}
