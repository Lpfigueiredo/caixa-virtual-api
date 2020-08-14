import { AddAccount, AddAccountModel, AccountModel, Hasher } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    await this.hasher.hash(accountData.password)
    return Promise.resolve(null)
  }
}
