import { MongoHelper } from '../helpers/mongo-helper'
import { AddMovementRepository } from '../../../../data/protocols/db/movement/add-movement-repository'
import { AddMovementModel } from '../../../../domain/usecases/movement/add-movement'
import { LoadDailyMovementRepository } from '../../../../data/protocols/db/daily-movement/load-daily-movement-repository'
import { LoadDailyMovementModel } from '../../../../domain/usecases/daily-movement/load-daily-movement'
import { DailyMovementModel } from '../../../../domain/models/daily-movement'
import { ObjectId } from 'mongodb'

export class MovementMongoRepository implements AddMovementRepository, LoadDailyMovementRepository {
  async add (movementData: AddMovementModel): Promise<void> {
    const movementCollection = await MongoHelper.getCollection('movements')
    const { accountId, categoryId, ...movementDataWithoutIds } = movementData
    const movementDataFormatted = Object.assign(
      {},
      { accountId: new ObjectId(accountId) },
      { categoryId: new ObjectId(categoryId) },
      movementDataWithoutIds
    )
    await movementCollection.insertOne(movementDataFormatted)
  }

  async load (data: LoadDailyMovementModel): Promise<DailyMovementModel> {
    const start = new Date(new Date(data.date).setHours(0, 0, 0, 0))
    const end = new Date(new Date(data.date).setHours(23, 59, 59, 999))
    const sort: number = -1
    const agg = [
      {
        $match: {
          accountId: new ObjectId(data.accountId)
        }
      }, {
        $match: {
          date: {
            $gte: start,
            $lte: end
          }
        }
      }, {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category'
        }
      }, {
        $unwind: {
          path: '$category'
        }
      }, {
        $sort: {
          date: sort
        }
      }, {
        $group: {
          _id: '$accountId',
          movements: {
            $push: {
              date: '$date',
              id: '$_id',
              category: {
                id: '$category._id',
                name: '$category.name'
              },
              type: '$type',
              value: {
                $divide: [
                  '$value', 100
                ]
              },
              description: '$description'
            }
          }
        }
      }, {
        $lookup: {
          from: 'accounts',
          localField: '_id',
          foreignField: '_id',
          as: 'accountData'
        }
      }, {
        $unwind: {
          path: '$accountData'
        }
      }, {
        $project: {
          _id: 0,
          totalBalance: {
            $divide: [
              '$accountData.totalBalance', 100
            ]
          },
          movements: '$movements'
        }
      }
    ]
    const movementCollection = await MongoHelper.getCollection('movements')
    const dailyMovement = await movementCollection.aggregate(agg).toArray()
    return dailyMovement.length ? dailyMovement[0] : null
  }
}
