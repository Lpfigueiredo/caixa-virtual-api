import { LoadDailyMovementModel } from '../../../../domain/usecases/daily-movement/load-daily-movement'
import { DailyMovementModel } from '../../../../domain/models/daily-movement'
import { LoadDailyMovementRepository } from '../../../protocols/db/daily-movement/load-daily-movement-repository'
import { DbLoadDailyMovement } from './db-load-daily-movement'
import MockDate from 'mockdate'

const makeFakeLoadDailyMovementData = (): LoadDailyMovementModel => ({
  accountId: 'any_account_id',
  date: new Date()
})

const makeFakeDailyMovement = (): DailyMovementModel => ({
  totalBalance: 400,
  movements: [
    {
      date: new Date(),
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

interface SutTypes {
  sut: DbLoadDailyMovement
  loadDailyMovementRepositoryStub: LoadDailyMovementRepository
}

const makeLoadDailyMovementRepository = (): LoadDailyMovementRepository => {
  class LoadDailyMovementRepositoryStub implements LoadDailyMovementRepository {
    async load (data: LoadDailyMovementModel): Promise<DailyMovementModel> {
      return new Promise(resolve => resolve(makeFakeDailyMovement()))
    }
  }
  return new LoadDailyMovementRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadDailyMovementRepositoryStub = makeLoadDailyMovementRepository()
  const sut = new DbLoadDailyMovement(loadDailyMovementRepositoryStub)
  return {
    sut,
    loadDailyMovementRepositoryStub
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

  test('Should return LoadDailyMovementModel on success', async () => {
    const { sut } = makeSut()
    const dailyMovement = await sut.load(makeFakeLoadDailyMovementData())
    expect(dailyMovement).toEqual(makeFakeDailyMovement())
  })
})
