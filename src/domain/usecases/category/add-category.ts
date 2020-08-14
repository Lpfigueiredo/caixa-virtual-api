export interface AddCategoryModel {
  name: string
}

export interface AddCategory {
  add (data: AddCategoryModel): Promise<void>
}
