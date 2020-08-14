import { AddCategory, AddCategoryModel, AddCategoryRepository } from './db-add-category-protocols'

export class DbAddCategory implements AddCategory {
  constructor (private readonly addCategoryRepository: AddCategoryRepository) {}

  async add (data: AddCategoryModel): Promise<void> {
    await this.addCategoryRepository.add(data)
  }
}
