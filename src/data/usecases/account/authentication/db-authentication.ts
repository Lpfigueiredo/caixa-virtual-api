import {
  Authentication,
  AuthenticationModel,
  LoadAccountByEmailRepository
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    return null
  }
}
