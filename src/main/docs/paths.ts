import {
  loginPath,
  signUpPath,
  categoriesPath,
  entriesPath,
  exitsPath,
  dailyMovementPath
} from './paths/'

export default {
  '/signup': signUpPath,
  '/login': loginPath,
  '/categories': categoriesPath,
  '/entries/{categoryId}': entriesPath,
  '/exits/{categoryId}': exitsPath,
  '/daily-movement': dailyMovementPath
}
