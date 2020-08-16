import { LoadCategoriesByAccountCategoryId } from '../../../../domain/usecases/category/load-categories-by-account-category-id'
import { LoadCategoryByAccountCategoryIdRepository } from '../../../../data/protocols/db/category/load-category-by-account-category-id-repository'
import { CategoryModel } from '../../../../domain/models/category'

export class DbLoadCategoryByAccountCategoryId implements LoadCategoriesByAccountCategoryId {
  constructor (private readonly loadCategoriesByAccountCategoryId: LoadCategoryByAccountCategoryIdRepository) {}

  async loadByAccountCategoryId (accountId: string, categoryId: string): Promise<CategoryModel> {
    const category = await this.loadCategoriesByAccountCategoryId.loadByAccountCategoryId(accountId, categoryId)
    return category
  }
}
