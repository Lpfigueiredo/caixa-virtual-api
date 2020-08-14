import { LoadCategoryModel } from '../../models/load-category'

export interface LoadCategories {
  load (): Promise<LoadCategoryModel[]>
}
