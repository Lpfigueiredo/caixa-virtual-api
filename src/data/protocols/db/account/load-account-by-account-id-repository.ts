import { AccountModel } from '../../../../domain/models/account'

export interface LoadAccountByAccountIdRepository {
  loadByAccountId (accountId: string): Promise<AccountModel>
}
