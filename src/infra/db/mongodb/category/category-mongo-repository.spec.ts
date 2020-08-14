import { CategoryMongoRepository } from './category-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'

let categoryCollection: Collection

const makeSut = (): CategoryMongoRepository => {
  return new CategoryMongoRepository()
}

describe('Category Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    categoryCollection = await MongoHelper.getCollection('categories')
    await categoryCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add a category on success', async () => {
      const sut = makeSut()
      await sut.add({
        accountId: 'any_account_id',
        name: 'any_category_name'
      })
      const category = await categoryCollection.findOne({ name: 'any_category_name' })
      expect(category).toBeTruthy()
    })
  })
})
