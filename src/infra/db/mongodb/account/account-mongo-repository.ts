import { AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { AddAccountModel } from '../../../../domain/usecases/account/add-account'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'
import { UpdateAccessTokenRepository } from '../../../../data/protocols/db/account/update-access-token-repository'
import { UpdateAccountRepository } from '../../../../data/protocols/db/account/update-account-repository'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository implements AddAccountRepository, UpdateAccessTokenRepository, UpdateAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const newAccount = Object.assign({}, accountData, { totalBalance: 0 })
    const result = await accountCollection.insertOne(newAccount)
    return MongoHelper.map(result.ops[0])
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: new ObjectId(id)
    }, {
      $set: {
        accessToken: token
      }
    })
  }

  async loadByToken (token: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ accessToken: token })
    return account && MongoHelper.map(account)
  }

  async updateTotalBalance (id: string, value: number): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: new ObjectId(id)
    }, {
      $inc: {
        totalBalance: value
      }
    })
  }
}
