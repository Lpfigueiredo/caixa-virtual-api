import { AddMovementModel } from '../../../../domain/usecases/movement/add-movement'
import { AddMovementRepository } from '../../../protocols/db/movement/add-movement-repository'
import { DbAddMovement } from './db-add-movement'
import { UpdateAccountRepository } from '../../../protocols/db/account/update-account-repository'

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

const makeUpdateAccountRepository = (): UpdateAccountRepository => {
  class UpdateAccountRepositoryStub implements UpdateAccountRepository {
    async updateTotalBalance (id: string, value: number): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new UpdateAccountRepositoryStub()
}

interface SutTypes {
  sut: DbAddMovement
  addMovementRepositoryStub: AddMovementRepository
  updateAccountRepositoryStub: UpdateAccountRepository
}

const makeSut = (): SutTypes => {
  const addMovementRepositoryStub = makeAddMovementRepository()
  const updateAccountRepositoryStub = makeUpdateAccountRepository()
  const sut = new DbAddMovement(addMovementRepositoryStub, updateAccountRepositoryStub)
  return {
    sut,
    addMovementRepositoryStub,
    updateAccountRepositoryStub
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

  test('Should throw if AddMovementRepository throws', async () => {
    const { sut, addMovementRepositoryStub } = makeSut()
    jest.spyOn(addMovementRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeMovementData())
    await expect(promise).rejects.toThrow()
  })

  test('Should call UpdateAccountRepository with correct values', async () => {
    const { sut, updateAccountRepositoryStub } = makeSut()
    const updateTotalBalanceSpy = jest.spyOn(updateAccountRepositoryStub, 'updateTotalBalance')
    const movementData = makeFakeMovementData()
    await sut.add(movementData)
    expect(updateTotalBalanceSpy).toHaveBeenCalledWith('any_account_id', 12345)
  })

  test('Should throw if UpdateAccountRepository throws', async () => {
    const { sut, updateAccountRepositoryStub } = makeSut()
    jest.spyOn(updateAccountRepositoryStub, 'updateTotalBalance').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeMovementData())
    await expect(promise).rejects.toThrow()
  })
})
