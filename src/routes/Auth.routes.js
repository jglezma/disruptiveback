import { Router } from 'express'
import * as authControllers from '../controllers/Auth.controllers.js'

const router = Router()

router.post('/login', authControllers.login)
router.post('/signup', authControllers.signup)

export default router
