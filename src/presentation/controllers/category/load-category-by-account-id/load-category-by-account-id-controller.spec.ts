import { HttpRequest } from '../../../protocols'
import { CategoryModel } from '../../../../domain/models/category'
import { LoadCategoriesByAccountId } from '../../../../domain/usecases/category/load-categories-by-account-id'
import { LoadCategoryController } from './load-category-by-account-id-controller'
import { ok, noContent, serverError } from '../../../helpers/http/http-helper'

const makeFakeRequest = (): HttpRequest => ({
  accountId: 'any_account_id'
})

const makeFakeCategoryResult = (): CategoryModel[] => ([
  {
    id: 'any_id',
    accountId: 'any_accountId',
    name: 'any_name'
  },
  {
    id: 'any_id',
    accountId: 'any_accountId',
    name: 'any_name'
  }
])

const makeLoadCategoryByAccountId = (): LoadCategoriesByAccountId => {
  class LoadCategoriesByAccountIdStub implements LoadCategoriesByAccountId {
    async loadById (id: string): Promise<CategoryModel[]> {
      return new Promise(resolve => resolve(makeFakeCategoryResult()))
    }
  }
  return new LoadCategoriesByAccountIdStub()
}

interface SutTypes {
  sut: LoadCategoryController
  loadCategoriesByAccountIdStub: LoadCategoriesByAccountId
}

const makeSut = (): SutTypes => {
  const loadCategoriesByAccountIdStub = makeLoadCategoryByAccountId()
  const sut = new LoadCategoryController(loadCategoriesByAccountIdStub)
  return {
    sut,
    loadCategoriesByAccountIdStub
  }
}

describe('LoadCategory Controller', () => {
  test('Should call LoadCategoriesByAccountId with correct value', async () => {
    const { sut, loadCategoriesByAccountIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadCategoriesByAccountIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_account_id')
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeCategoryResult()))
  })

  test('Should return 204 if LoadCategoriesByAccountId returns empty', async () => {
    const { sut , loadCategoriesByAccountIdStub } = makeSut()
    jest.spyOn(loadCategoriesByAccountIdStub, 'loadById').mockReturnValueOnce(new Promise((resolve) => resolve([])))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadCategoriesByAccountId throws', async () => {
    const { sut, loadCategoriesByAccountIdStub } = makeSut()
    jest.spyOn(loadCategoriesByAccountIdStub, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
