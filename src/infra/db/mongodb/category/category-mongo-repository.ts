import { AddCategoryRepository } from '../../../../data/protocols/db/category/add-category-repository'
import { AddCategoryModel } from '../../../../domain/usecases/category/add-category'
import { MongoHelper } from '../helpers/mongo-helper'
import { LoadCategoryRepository } from '../../../../data/protocols/db/category/load-category-repository'
import { LoadCategoryByAccountCategoryIdRepository } from '../../../../data/protocols/db/category/load-category-by-account-category-id-repository'
import { CategoryModel } from '../../../../domain/models/category'
import { ObjectId } from 'mongodb'

export class CategoryMongoRepository implements AddCategoryRepository, LoadCategoryRepository, LoadCategoryByAccountCategoryIdRepository {
  async add (categoryData: AddCategoryModel): Promise<void> {
    const categoryCollection = await MongoHelper.getCollection('categories')
    const { accountId, ...categoryDataWithoutAccountId } = categoryData
    const categoryDataFormatted = Object.assign({}, { accountId: new ObjectId(accountId) }, categoryDataWithoutAccountId)
    await categoryCollection.insertOne(categoryDataFormatted)
  }

  async loadByAccountId (id: string): Promise<CategoryModel[]> {
    const categoryCollection = await MongoHelper.getCollection('categories')
    const categories = await categoryCollection.find({ accountId: new ObjectId(id) }).toArray()
    return MongoHelper.mapCollection(categories)
  }

  async loadByAccountCategoryId (accountId: string, categoryId: string): Promise<CategoryModel> {
    const categoryCollection = await MongoHelper.getCollection('categories')
    const category = await categoryCollection.findOne({ accountId: new ObjectId(accountId), _id: new ObjectId(categoryId) })
    return category && MongoHelper.map(category)
  }
}
