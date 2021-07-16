import { Router } from 'express'
import { getSpareParts, postSparePart } from '../controllers/sparePart.controller'

const router: Router = Router()

router.get('/spare-parts', getSpareParts)
router.post('/spare-part', postSparePart)

export default router
