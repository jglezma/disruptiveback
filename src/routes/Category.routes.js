import { Router } from 'express'
import * as categoryControllers from '../controllers/Category.controllers.js'

const router = Router()

router.post('/', categoryControllers.createCategory)

export default router
