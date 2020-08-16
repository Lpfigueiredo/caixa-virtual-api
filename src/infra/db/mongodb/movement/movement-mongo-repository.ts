import { MongoHelper } from '../helpers/mongo-helper'
import { AddMovementRepository } from '../../../../data/protocols/db/movement/add-movement-repository'
import { AddMovementModel } from '../../../../domain/usecases/movement/add-movement'
import { ObjectId } from 'mongodb'

export class MovementMongoRepository implements AddMovementRepository {
  async add (movementData: AddMovementModel): Promise<void> {
    const categoryCollection = await MongoHelper.getCollection('movements')
    const { accountId, categoryId, ...movementDataWithoutIds } = movementData
    const movementDataFormatted = Object.assign(
      {},
      { accountId: new ObjectId(accountId) },
      { categoryId: new ObjectId(categoryId) },
      movementDataWithoutIds
    )
    await categoryCollection.insertOne(movementDataFormatted)
  }
}
