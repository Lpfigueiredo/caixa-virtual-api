import { HttpRequest } from '../../../protocols'
import { DailyMovementModel } from '../../../../domain/models/daily-movement'
import { LoadDailyMovement, LoadDailyMovementModel } from '../../../../domain/usecases/daily-movement/load-daily-movement'
import MockDate from 'mockdate'
import { LoadDailyMovementController } from './load-daily-movement-controller'

const makeFakeRequest = (): HttpRequest => ({
  accountId: 'any_account_id'
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
  sut: LoadDailyMovementController
  loadDailyMovementStub: LoadDailyMovement
}

const makeLoadDailyMovement = (): LoadDailyMovement => {
  class LoadDailyMovementStub implements LoadDailyMovement {
    async load (data: LoadDailyMovementModel): Promise<DailyMovementModel> {
      return new Promise(resolve => resolve(makeFakeDailyMovement()))
    }
  }
  return new LoadDailyMovementStub()
}

const makeSut = (): SutTypes => {
  const loadDailyMovementStub = makeLoadDailyMovement()
  const sut = new LoadDailyMovementController(loadDailyMovementStub)
  return {
    sut,
    loadDailyMovementStub
  }
}

describe('LoadDailyMovement Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadDailyMovement with correct value', async () => {
    const { sut, loadDailyMovementStub } = makeSut()
    const loadSpy = jest.spyOn(loadDailyMovementStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith({
      accountId: 'any_account_id',
      date: new Date()
    })
  })
})
