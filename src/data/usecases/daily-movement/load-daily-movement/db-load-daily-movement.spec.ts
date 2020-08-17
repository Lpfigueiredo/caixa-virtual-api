import { LoadDailyMovementModel } from '../../../../domain/usecases/daily-movement/load-daily-movement'
import { DailyMovementModel } from '../../../../domain/models/daily-movement'
import { LoadDailyMovementRepository } from '../../../protocols/db/daily-movement/load-daily-movement-repository'
import { DbLoadDailyMovement } from './db-load-daily-movement'
import { AccountModel } from '../../../../domain/models/account'
import { LoadAccountByAccountIdRepository } from '../../../protocols/db/account/load-account-by-account-id-repository'
import MockDate from 'mockdate'

const makeFakeLoadDailyMovementData = (): LoadDailyMovementModel => ({
  accountId: 'any_account_id',
  date: new Date().toISOString()
})

const makeFakeDailyMovement = (): DailyMovementModel => ({
  totalBalance: 400,
  movements: [
    {
      date: new Date().toISOString(),
      id: 'any_movement_id',
      category: {
        id: 'any_category_id',
        name: 'any_category_name'
      },
      type: 'any_type',
      value: 400,
      description: 'any_description'
    }
  ]
})

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password',
  totalBalance: 0
})

const makeFakeEmptyDailyMovement = (): DailyMovementModel => ({
  totalBalance: 0,
  movements: []
})

const makeLoadDailyMovementRepository = (): LoadDailyMovementRepository => {
  class LoadDailyMovementRepositoryStub implements LoadDailyMovementRepository {
    async load (data: LoadDailyMovementModel): Promise<DailyMovementModel> {
      return new Promise(resolve => resolve(makeFakeDailyMovement()))
    }
  }
  return new LoadDailyMovementRepositoryStub()
}

const makeLoadAccountByAccountIdRepository = (): LoadAccountByAccountIdRepository => {
  class LoadAccountByAccountIdRepositoryStub implements LoadAccountByAccountIdRepository {
    async loadByAccountId (accountId: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByAccountIdRepositoryStub()
}

interface SutTypes {
  sut: DbLoadDailyMovement
  loadDailyMovementRepositoryStub: LoadDailyMovementRepository
  loadAccountByAccountIdRepositoryStub: LoadAccountByAccountIdRepository
}

const makeSut = (): SutTypes => {
  const loadDailyMovementRepositoryStub = makeLoadDailyMovementRepository()
  const loadAccountByAccountIdRepositoryStub = makeLoadAccountByAccountIdRepository()
  const sut = new DbLoadDailyMovement(loadDailyMovementRepositoryStub, loadAccountByAccountIdRepositoryStub)
  return {
    sut,
    loadDailyMovementRepositoryStub,
    loadAccountByAccountIdRepositoryStub
  }
}

describe('DbLoadDailyMovement Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadDailyMovementRepository with correct values', async () => {
    const { sut, loadDailyMovementRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadDailyMovementRepositoryStub, 'load')
    await sut.load(makeFakeLoadDailyMovementData())
    expect(loadSpy).toHaveBeenCalledWith(makeFakeLoadDailyMovementData())
  })

  test('Should throw if LoadDailyMovementRepository throws', async () => {
    const { sut, loadDailyMovementRepositoryStub } = makeSut()
    jest.spyOn(loadDailyMovementRepositoryStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load(makeFakeLoadDailyMovementData())
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadAccountByAccountIdRepositoryStub if LoadDailyMovementRepository returns null', async () => {
    const { sut, loadDailyMovementRepositoryStub, loadAccountByAccountIdRepositoryStub } = makeSut()
    const loadByAccountIdSpy = jest.spyOn(loadAccountByAccountIdRepositoryStub, 'loadByAccountId')
    jest.spyOn(loadDailyMovementRepositoryStub, 'load').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    await sut.load(makeFakeLoadDailyMovementData())
    expect(loadByAccountIdSpy).toHaveBeenCalledWith('any_account_id')
  })

  test('Should return LoadDailyMovementModel with empty movement array if LoadDailyMovementRepository returns null', async () => {
    const { sut, loadDailyMovementRepositoryStub } = makeSut()
    jest.spyOn(loadDailyMovementRepositoryStub, 'load').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const dailyMovement = await sut.load(makeFakeLoadDailyMovementData())
    expect(dailyMovement).toEqual(makeFakeEmptyDailyMovement())
  })

  test('Should return LoadDailyMovementModel on success', async () => {
    const { sut } = makeSut()
    const dailyMovement = await sut.load(makeFakeLoadDailyMovementData())
    expect(dailyMovement).toEqual(makeFakeDailyMovement())
  })
})
