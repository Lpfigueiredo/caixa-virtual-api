import { LoadCategoriesController } from './load-categories-controller'
import { LoadCategoryModel, LoadCategories } from './load-categories-controller-protocols'

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
})
