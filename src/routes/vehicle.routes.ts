import { authMiddleware } from './../middlewares/auth.middleware'
import { Router } from 'express'
import { getVehicles } from '../controllers/vehicle.controller'

const router: Router = Router()

const baseUrl = '/garage/v1.0'

router.get(`${baseUrl}/vehicles`, authMiddleware, getVehicles)

export default router
