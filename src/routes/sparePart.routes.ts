import { Router } from 'express'
import { getSpareParts, postSparePart } from '../controllers/sparePart.controller'

const router: Router = Router()

router.get(`/garage/v1.0/spare-parts`, getSpareParts)
router.post('/garage/v1.0/spare-part', postSparePart)

export default router
