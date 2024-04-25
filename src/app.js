import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import CategoryRoutes from './routes/Category.routes.js'
import ContentRoutes from './routes/Content.routes.js'
import authRoutes from './routes/Auth.routes.js'

const app = express()

// Settingss
app.use(cors())
app.use(morgan('dev'))

// Middlewares
app.use(express.json())

// Routes
app.use('/api/category', CategoryRoutes)
app.use('/api/content', ContentRoutes)
app.use('/api/auth', authRoutes)

export default app
