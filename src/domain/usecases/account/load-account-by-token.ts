import { AccountModel } from '../../models/account'

export interface LoadAccountByToken {
  load (accessToken: string): Promise<AccountModel>
}
