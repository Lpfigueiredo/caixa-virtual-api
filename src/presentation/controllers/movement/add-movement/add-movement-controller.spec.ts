import { HttpRequest } from '../../../protocols'
import { LoadCategoriesByAccountId } from '../../../../domain/usecases/category/load-categories-by-account-id'
import { LoadCategoryModel } from '../../../../domain/models/load-category'
import { AddMovementController } from './add-movement-controller'
import { forbidden, serverError, noContent } from '../../../helpers/http/http-helper'
import { InvalidParamError } from '../../../errors/invalid-param-error'
import { AddMovement, AddMovementModel } from '../../../../domain/usecases/movement/add-movement/add-movement'
import MockDate from 'mockdate'

const makeFakeRequest = (): HttpRequest => ({
  accountId: 'any_account_id',
  body: {
    categoryId: 'any_id',
    value: '123.45',
    description: 'any_description'
  }
})

const makeFakeCategoryResult = (): LoadCategoryModel[] => ([
  {
    id: 'any_id',
    name: 'any_name'
  },
  {
    id: 'any_id',
    name: 'any_name'
  }
])

const makeLoadCategoryByAccountId = (): LoadCategoriesByAccountId => {
  class LoadCategoriesByAccountIdStub implements LoadCategoriesByAccountId {
    async loadById (id: string): Promise<LoadCategoryModel[]> {
      return new Promise(resolve => resolve(makeFakeCategoryResult()))
    }
  }
  return new LoadCategoriesByAccountIdStub()
}

const makeAddMovement = (): AddMovement => {
  class AddMovementStub implements AddMovement {
    async add (data: AddMovementModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddMovementStub()
}

interface SutTypes {
  sut: AddMovementController
  loadCategoriesByAccountIdStub: LoadCategoriesByAccountId
  addMovementStub: AddMovement
}

const makeSut = (type: string): SutTypes => {
  const loadCategoriesByAccountIdStub = makeLoadCategoryByAccountId()
  const addMovementStub = makeAddMovement()
  const sut = new AddMovementController(loadCategoriesByAccountIdStub, addMovementStub, type)
  return {
    sut,
    loadCategoriesByAccountIdStub,
    addMovementStub
  }
}

describe('AddMovement Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadCategoriesByAccountId with correct value', async () => {
    const { sut, loadCategoriesByAccountIdStub } = makeSut('entry')
    const loadByAccountIdSpy = jest.spyOn(loadCategoriesByAccountIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByAccountIdSpy).toHaveBeenCalledWith('any_account_id')
  })

  test('Should return 403 if LoadCategoriesByAccountId returns empty', async () => {
    const { sut , loadCategoriesByAccountIdStub } = makeSut('entry')
    jest.spyOn(loadCategoriesByAccountIdStub, 'loadById').mockReturnValueOnce(new Promise((resolve) => resolve([])))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('categoryId')))
  })

  test('Should return 500 if LoadCategoriesByAccountId throws', async () => {
    const { sut, loadCategoriesByAccountIdStub } = makeSut('entry')
    jest.spyOn(loadCategoriesByAccountIdStub, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 if an invalid categoryId is provided', async () => {
    const { sut } = makeSut('entry')
    const httpResponse = await sut.handle({
      accountId: 'any_account_id',
      body: {
        categoryId: 'wrong_id',
        value: '123.45',
        description: 'any_description'
      }
    })
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('categoryId')))
  })

  test('Should call AddMovement with correct values', async () => {
    const { sut, addMovementStub } = makeSut('entry')
    const addMovementSpy = jest.spyOn(addMovementStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addMovementSpy).toHaveBeenCalledWith({
      accountId: 'any_account_id',
      categoryId: 'any_id',
      type: 'entry',
      value: 12345,
      description: 'any_description',
      date: new Date()
    })
  })

  test('Should call AddMovement with correct values', async () => {
    const { sut, addMovementStub } = makeSut('exit')
    const addMovementSpy = jest.spyOn(addMovementStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addMovementSpy).toHaveBeenCalledWith({
      accountId: 'any_account_id',
      categoryId: 'any_id',
      type: 'exit',
      value: -12345,
      description: 'any_description',
      date: new Date()
    })
  })

  test('Should return 500 if AddMovement throws', async () => {
    const { sut, addMovementStub } = makeSut('entry')
    jest.spyOn(addMovementStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut('entry')
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
