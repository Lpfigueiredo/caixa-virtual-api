import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupCelebrate from './celebrate'

const app = express()
setupMiddlewares(app)
setupRoutes(app)
setupCelebrate(app)
export default app
