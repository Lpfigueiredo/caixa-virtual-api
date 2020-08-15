import { MongoHelper } from '../helpers/mongo-helper'
import { AddMovementRepository } from '../../../../data/protocols/db/movement/add-movement-repository'
import { AddMovementModel } from '../../../../domain/usecases/movement/add-movement/add-movement'

export class MovementMongoRepository implements AddMovementRepository {
  async add (movementData: AddMovementModel): Promise<void> {
    const categoryCollection = await MongoHelper.getCollection('movements')
    await categoryCollection.insertOne(movementData)
  }
}
