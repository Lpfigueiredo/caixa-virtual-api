import { LoadCategoriesController } from './load-categories-controller'
import { LoadCategoryModel, LoadCategories } from './load-categories-controller-protocols'
import { ok, noContent, serverError } from '../../../helpers/http/http-helper'

const makeFakeLoadCategory = (): LoadCategoryModel[] => {
  return [{
    id: 'any_id',
    name: 'any_name'
  },
  {
    id: 'other_id',
    name: 'other_name'
  }]
}

interface SutTypes {
  sut: LoadCategoriesController
  loadCategoriesStub: LoadCategories
}

const makeLoadCategories = (): LoadCategories => {
  class LoadCategoriesStub implements LoadCategories {
    async load (): Promise<LoadCategoryModel[]> {
      return new Promise(resolve => resolve(makeFakeLoadCategory()))
    }
  }
  return new LoadCategoriesStub()
}

const makeSut = (): SutTypes => {
  const loadCategoriesStub = makeLoadCategories()
  const sut = new LoadCategoriesController(loadCategoriesStub)
  return {
    sut,
    loadCategoriesStub
  }
}

describe('LoadCategories Controller', () => {
  test('Should call LoadCategories', async () => {
    const { sut, loadCategoriesStub } = makeSut()
    const loadSpy = jest.spyOn(loadCategoriesStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeLoadCategory()))
  })

  test('Should return 204 if LoadSurveys returns empty', async () => {
    const { sut , loadCategoriesStub } = makeSut()
    jest.spyOn(loadCategoriesStub, 'load').mockReturnValueOnce(new Promise((resolve) => resolve([])))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadCategoriesStub } = makeSut()
    jest.spyOn(loadCategoriesStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
