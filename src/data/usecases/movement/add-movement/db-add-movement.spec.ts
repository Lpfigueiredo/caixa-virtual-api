import { AddMovementModel } from '../../../../domain/usecases/movement/add-movement/add-movement'
import { AddMovementRepository } from '../../../protocols/db/movement/add-movement-repository'
import { DbAddMovement } from './db-add-movement'

const makeFakeMovementData = (): AddMovementModel => ({
  accountId: 'any_account_id',
  categoryId: 'any_id',
  type: 'entry',
  value: 12345,
  description: 'any_description',
  date: new Date()
})

const makeAddMovementRepository = (): AddMovementRepository => {
  class AddMovementRepositoryStub implements AddMovementRepository {
    async add (surveyData: AddMovementModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddMovementRepositoryStub()
}

interface SutTypes {
  sut: DbAddMovement
  addMovementRepositoryStub: AddMovementRepository
}

const makeSut = (): SutTypes => {
  const addMovementRepositoryStub = makeAddMovementRepository()
  const sut = new DbAddMovement(addMovementRepositoryStub)
  return {
    sut,
    addMovementRepositoryStub
  }
}

describe('DbAddMovement Usecase', () => {
  test('Should call AddMovementRepository with correct values', async () => {
    const { sut, addMovementRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addMovementRepositoryStub, 'add')
    const movementData = makeFakeMovementData()
    await sut.add(movementData)
    expect(addSpy).toHaveBeenCalledWith(movementData)
  })
})
