import { Router } from 'express'
import * as contentControllers from '../controllers/Content.controllers.js'

const router = Router()

router.post('/', contentControllers.createContent)
router.get('/:id', contentControllers.getContentById)
router.get('/', contentControllers.getContents)

export default router