import { LoadCategoriesByAccountId } from '../../../../domain/usecases/category/load-categories-by-account-id'
import { LoadCategoryRepository } from '../../../protocols/db/category/load-category-repository'
import { LoadCategoryModel } from '../../../../domain/usecases/category/load-categories'

export class DbLoadCategory implements LoadCategoriesByAccountId {
  constructor (private readonly loadCategoryRepository: LoadCategoryRepository) {}

  async loadById (id: string): Promise<LoadCategoryModel[]> {
    const categories = await this.loadCategoryRepository.loadByAccountId(id)
    let categoriesFormated = []
    if (categories.length) {
      categoriesFormated = categories.map(category => ({ id: category.id, name: category.name }))
    }
    return categoriesFormated
  }
}
