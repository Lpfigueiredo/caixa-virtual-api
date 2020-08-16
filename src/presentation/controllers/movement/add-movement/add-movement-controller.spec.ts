import { HttpRequest } from '../../../protocols'
import { AddMovementController } from './add-movement-controller'
import { forbidden, serverError, noContent } from '../../../helpers/http/http-helper'
import { InvalidParamError } from '../../../errors/invalid-param-error'
import { AddMovement, AddMovementModel } from '../../../../domain/usecases/movement/add-movement/add-movement'
import { CategoryModel } from '../../../../domain/models/category'
import { LoadCategoriesByAccountCategoryId } from '../../../../domain/usecases/category/load-categories-by-account-category-id'
import MockDate from 'mockdate'

const makeFakeRequest = (): HttpRequest => ({
  accountId: 'any_account_id',
  body: {
    categoryId: 'any_category_id',
    value: '123.45',
    description: 'any_description'
  }
})

const makeFakeCategoryResult = (): CategoryModel => (
  {
    id: 'any_category_id',
    accountId: 'any_account_id',
    name: 'any_name'
  }
)

const makeLoadCategoryByAccSurveyId = (): LoadCategoriesByAccountCategoryId => {
  class LoadCategoriesByAccountCategoryIdStub implements LoadCategoriesByAccountCategoryId {
    async loadByAccountCategoryId (id: string): Promise<CategoryModel> {
      return new Promise(resolve => resolve(makeFakeCategoryResult()))
    }
  }
  return new LoadCategoriesByAccountCategoryIdStub()
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
  LoadCategoriesByAccountCategoryIdStub: LoadCategoriesByAccountCategoryId
  addMovementStub: AddMovement
}

const makeSut = (type: string): SutTypes => {
  const LoadCategoriesByAccountCategoryIdStub = makeLoadCategoryByAccSurveyId()
  const addMovementStub = makeAddMovement()
  const sut = new AddMovementController(LoadCategoriesByAccountCategoryIdStub, addMovementStub, type)
  return {
    sut,
    LoadCategoriesByAccountCategoryIdStub,
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

  test('Should call LoadCategoriesByAccountCategoryId with correct value', async () => {
    const { sut, LoadCategoriesByAccountCategoryIdStub } = makeSut('entry')
    const loadByAccountIdSpy = jest.spyOn(LoadCategoriesByAccountCategoryIdStub, 'loadByAccountCategoryId')
    await sut.handle(makeFakeRequest())
    expect(loadByAccountIdSpy).toHaveBeenCalledWith('any_account_id', 'any_category_id')
  })

  test('Should return 403 if LoadCategoriesByAccountCategoryId returns null', async () => {
    const { sut , LoadCategoriesByAccountCategoryIdStub } = makeSut('entry')
    jest.spyOn(LoadCategoriesByAccountCategoryIdStub, 'loadByAccountCategoryId').mockReturnValueOnce(new Promise((resolve) => resolve()))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('categoryId')))
  })

  test('Should return 500 if LoadCategoriesByAccountCategoryId throws', async () => {
    const { sut, LoadCategoriesByAccountCategoryIdStub } = makeSut('entry')
    jest.spyOn(LoadCategoriesByAccountCategoryIdStub, 'loadByAccountCategoryId').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call AddMovement with correct values', async () => {
    const { sut, addMovementStub } = makeSut('entry')
    const addMovementSpy = jest.spyOn(addMovementStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addMovementSpy).toHaveBeenCalledWith({
      accountId: 'any_account_id',
      categoryId: 'any_category_id',
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
      categoryId: 'any_category_id',
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
