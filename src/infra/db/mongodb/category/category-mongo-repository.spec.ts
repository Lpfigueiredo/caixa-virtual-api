import { CategoryMongoRepository } from './category-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection, ObjectId } from 'mongodb'

let categoryCollection: Collection
let accountCollection: Collection

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
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add a category on success', async () => {
      const res = await accountCollection.insertOne({ nome: 'Leonardo' })
      const sut = makeSut()
      await sut.add({
        accountId: new ObjectId(res.ops[0]._id).toHexString(),
        name: 'any_category_name'
      })
      const category = await categoryCollection.findOne({ name: 'any_category_name' })
      expect(category).toBeTruthy()
    })
  })

  describe('loadByAccountId()', () => {
    test('Should load categories by id on success', async () => {
      const res = await accountCollection.insertOne({ nome: 'Leonardo' })
      await categoryCollection.insertOne({
        name: 'any_name',
        accountId: res.ops[0]._id
      })
      const sut = makeSut()
      const category = await sut.loadByAccountId(res.ops[0]._id)
      expect(category).toBeTruthy()
      expect(category.length).toBe(1)
    })

    test('Should load empty list', async () => {
      const res = await accountCollection.insertOne({ nome: 'Leonardo' })
      const sut = makeSut()
      const surveys = await sut.loadByAccountId(res.ops[0]._id)
      expect(surveys.length).toBe(0)
    })
  })

  describe('loadByAccountCategoryId()', () => {
    test('Should load category by ids on success', async () => {
      const resAccount = await accountCollection.insertOne({ nome: 'Leonardo' })
      const resCategory = await categoryCollection.insertOne({
        name: 'any_name',
        accountId: resAccount.ops[0]._id
      })
      const sut = makeSut()
      const category = await sut.loadByAccountCategoryId(resAccount.ops[0]._id, resCategory.ops[0]._id)
      expect(category).toBeTruthy()
    })
  })
})
