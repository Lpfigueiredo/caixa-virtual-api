import { AccountModel } from '../../models/account'

export interface AddAccountModel {
  name: string
  email: string
  password: string
  totalBalance: number
}

export interface AddAccount {
  add (account: AddAccountModel): Promise<AccountModel>
}
