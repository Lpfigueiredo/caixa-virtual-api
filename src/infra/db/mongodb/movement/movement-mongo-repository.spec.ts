import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import { AddMovementModel } from '../../../../domain/usecases/movement/add-movement'
import { MovementMongoRepository } from './movement-mongo-repository'

let movementCollection: Collection

const makeFakeMovementData = (): AddMovementModel => ({
  accountId: 'any_account_id',
  categoryId: 'any_id',
  type: 'entry',
  value: 12345,
  description: 'any_description',
  date: new Date()
})

const makeSut = (): MovementMongoRepository => {
  return new MovementMongoRepository()
}

describe('Category Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
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
})
