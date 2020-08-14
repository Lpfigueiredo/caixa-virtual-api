import { HttpRequest } from '../../../protocols'
import { AddCategory, AddCategoryModel } from '../../../../domain/usecases/category/add-category'
import { AddCategoryController } from './add-category-controller'

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
})
