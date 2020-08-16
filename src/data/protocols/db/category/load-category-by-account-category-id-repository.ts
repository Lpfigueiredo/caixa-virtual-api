import { CategoryModel } from '../../../../domain/models/category'

export interface LoadCategoryByAccountCategoryIdRepository {
  loadByAccountCategoryId (accountId: string, categoryId: string): Promise<CategoryModel>
}
