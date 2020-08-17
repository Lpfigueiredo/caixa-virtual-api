import {
  loginPath,
  signUpPath,
  categoriesPath,
  entriesPath
} from './paths/'

export default {
  '/signup': signUpPath,
  '/login': loginPath,
  '/categories': categoriesPath,
  '/entries/{categoryId}': entriesPath
}
