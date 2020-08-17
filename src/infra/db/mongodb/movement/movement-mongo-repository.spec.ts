import { MongoHelper } from '../helpers/mongo-helper'
import { Collection, ObjectId } from 'mongodb'
import { AddMovementModel } from '../../../../domain/usecases/movement/add-movement'
import { MovementMongoRepository } from './movement-mongo-repository'
import MockDate from 'mockdate'

let accountCollection: Collection
let categoryCollection: Collection
let movementCollection: Collection

const makeAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    totalBalance: 5
  })
  return new ObjectId(res.ops[0]._id).toHexString()
}

const makeCategoryId = async (accountId: string): Promise<string> => {
  const res = await categoryCollection.insertOne({
    accountId,
    name: 'any_category_name'
  })
  return new ObjectId(res.ops[0]._id).toHexString()
}

const makeFakeMovementData = (): AddMovementModel => ({
  accountId: 'aaaaaaaaaaaaaaaaaaaaaaaa',
  categoryId: 'bbbbbbbbbbbbbbbbbbbbbbbb',
  type: 'entry',
  value: 12345,
  description: 'any_description',
  date: new Date().toISOString()
})

const makeSut = (): MovementMongoRepository => {
  return new MovementMongoRepository()
}

describe('Category Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    MockDate.set(new Date().setHours(0, 0, 0))
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
    MockDate.reset()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
    categoryCollection = await MongoHelper.getCollection('categories')
    await categoryCollection.deleteMany({})
    movementCollection = await MongoHelper.getCollection('movements')
    await movementCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add a movement on success', async () => {
      const sut = makeSut()
      await sut.add(makeFakeMovementData())
      const movement = await movementCollection.findOne({ description: 'any_description' })
      expect(movement).toBeTruthy()
    })
  })

  describe('load()', () => {
    test('Should load a daily movement on success', async () => {
      const accountId = await makeAccountId()
      const categoryId = await makeCategoryId(accountId)
      await movementCollection.insertMany([{
        accountId: new ObjectId(accountId),
        categoryId: new ObjectId(categoryId),
        type: 'entry',
        value: 12345,
        description: 'any_description',
        date: new Date().toISOString()
      }, {
        accountId: new ObjectId(accountId),
        categoryId: new ObjectId(categoryId),
        type: 'exit',
        value: -12340,
        description: 'any_description',
        date: new Date().toISOString()
      }])
      const sut = makeSut()
      const dailyMovement = await sut.load({
        accountId,
        date: new Date().toISOString()
      })
      expect(dailyMovement).toBeTruthy()
      expect(dailyMovement.totalBalance).toBeTruthy()
      expect(dailyMovement.totalBalance).toBe(0.05)
      expect(dailyMovement.movements).toBeTruthy()
      expect(dailyMovement.movements.length).toBe(2)
      expect(dailyMovement.movements[0].description).toBe('any_description')
      expect(dailyMovement.movements[1].description).toBe('any_description')
    })
  })
})
