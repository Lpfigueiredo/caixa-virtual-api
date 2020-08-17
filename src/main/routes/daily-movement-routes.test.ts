import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let accountCollection: Collection

interface AccountToken {
  accountId: string
  accessToken: string
}

const makeAccessToken = async (): Promise<AccountToken> => {
  const res = await accountCollection.insertOne({
    name: 'Leonardo',
    email: 'leommko@gmail.com',
    password: '123'
  })
  const accountId = res.ops[0]._id
  const accessToken = sign({ accountId }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: accountId
  }, {
    $set: {
      accessToken
    }
  })
  return {
    accountId,
    accessToken
  }
}

describe('LoadDailyMovement Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('GET /daily-movement', () => {
    test('Should return 204 if no matches are found', async () => {
      const { accessToken } = await makeAccessToken()
      await request(app)
        .get('/api/daily-movement')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
