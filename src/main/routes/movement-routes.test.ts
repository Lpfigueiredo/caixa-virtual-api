import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection, ObjectId } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let categoryCollection: Collection
let accountCollection: Collection
let movementCollection: Collection

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

const makeCategory = async (accountId: string): Promise<string> => {
  const res = await categoryCollection.insertOne({
    accountId,
    name: 'Conta de luz'
  })
  return new ObjectId(res.ops[0]._id).toHexString()
}

describe('Category Routes', () => {
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
    movementCollection = await MongoHelper.getCollection('movements')
    await movementCollection.deleteMany({})
  })

  describe('POST /entries', () => {
    test('Should return 204 on success', async () => {
      const { accountId, accessToken } = await makeAccessToken()
      const categoryId = await makeCategory(accountId)
      await request(app)
        .post('/api/entries')
        .set('x-access-token', accessToken)
        .send({
          categoryId,
          value: '123.45',
          description: 'any_description'
        })
        .expect(204)
    })
  })

  describe('POST /exits', () => {
    test('Should return 204 on success', async () => {
      const { accountId, accessToken } = await makeAccessToken()
      const categoryId = await makeCategory(accountId)
      await request(app)
        .post('/api/exits')
        .set('x-access-token', accessToken)
        .send({
          categoryId,
          value: '123.45',
          description: 'any_description'
        })
        .expect(204)
    })
  })
})
