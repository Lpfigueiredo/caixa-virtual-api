import { LoadCategoryModel } from '../../models/load-category'

export interface LoadCategory {
  load (): Promise<LoadCategoryModel[]>
}
