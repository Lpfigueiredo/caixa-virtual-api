import { AddCategoryRepository } from '../../../../data/protocols/db/category/add-category-repository'
import { AddCategoryModel } from '../../../../domain/usecases/category/add-category'
import { MongoHelper } from '../helpers/mongo-helper'
import { LoadCategoryRepository } from '../../../../data/protocols/db/category/load-category-repository'
import { CategoryModel } from '../../../../domain/models/category'
import { ObjectId } from 'mongodb'

export class CategoryMongoRepository implements AddCategoryRepository, LoadCategoryRepository {
  async add (categoryData: AddCategoryModel): Promise<void> {
    const categoryCollection = await MongoHelper.getCollection('categories')
    await categoryCollection.insertOne(categoryData)
  }

  async loadByAccountId (id: string): Promise<CategoryModel[]> {
    const categoriyCollection = await MongoHelper.getCollection('categories')
    const categories = await categoriyCollection.find({ accountId: new ObjectId(id) }).toArray()
    return MongoHelper.mapCollection(categories)
  }
}
