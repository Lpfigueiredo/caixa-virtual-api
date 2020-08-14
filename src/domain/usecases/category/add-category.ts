export interface AddCategoryModel {
  accountId: string
  name: string
}

export interface AddCategory {
  add (data: AddCategoryModel): Promise<void>
}
