import { CategoryModel } from '../../../domain/models/category'

export interface LoadCategoriesByAccountCategoryId {
  loadByAccountCategoryId (accountId: string, categoryId: string): Promise<CategoryModel>
}
