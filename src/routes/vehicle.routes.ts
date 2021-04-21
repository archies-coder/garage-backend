import { Router } from 'express'
import { getVehicles } from '../controllers/vehicle.controller'
import { baseUrl } from './../app'

const router: Router = Router()

router.get(`${baseUrl}/vehicles`, getVehicles)

export default router
