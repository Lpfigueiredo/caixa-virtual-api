import { LoadCategoriesByAccountId } from '../../../../domain/usecases/category/load-categories-by-account-id'
import { CategoryModel } from '../../../../domain/models/category'
import { LoadCategoryRepository } from '../../../protocols/db/category/load-category-repository'

export class DbLoadCategory implements LoadCategoriesByAccountId {
  constructor (private readonly loadCategoryRepository: LoadCategoryRepository) {}

  async loadById (id: string): Promise<CategoryModel[]> {
    await this.loadCategoryRepository.loadByAccountId(id)
    return null
  }
}
