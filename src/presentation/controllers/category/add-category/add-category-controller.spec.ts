import { AddCategoryController } from './add-category-controller'
import { AddCategory, AddCategoryModel, HttpRequest } from './add-category-controller-protocols'
import { serverError, noContent } from '../../../helpers/http/http-helper'

const makeFakeRequest = (): HttpRequest => ({
  accountId: 'any_account_id',
  body: {
    name: 'any_category_name'
  }
})

const makeAddCategory = (): AddCategory => {
  class AddCategoryStub implements AddCategory {
    async add (data: AddCategoryModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddCategoryStub()
}

interface SutTypes {
  sut: AddCategoryController
  addCategoryStub: AddCategory
}

const makeSut = (): SutTypes => {
  const addCategoryStub = makeAddCategory()
  const sut = new AddCategoryController(addCategoryStub)
  return {
    sut,
    addCategoryStub
  }
}

describe('AddCategory Controller', () => {
  test('Should call AddCategory with correct values', async () => {
    const { sut, addCategoryStub } = makeSut()
    const addSpy = jest.spyOn(addCategoryStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      accountId: 'any_account_id',
      name: 'any_category_name'
    })
  })

  test('Should return 500 if AddCategory throws', async () => {
    const { sut, addCategoryStub } = makeSut()
    jest.spyOn(addCategoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
