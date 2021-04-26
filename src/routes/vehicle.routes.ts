import { Router } from 'express'
import { getVehicles, postVehicle } from '../controllers/vehicle.controller'

const router: Router = Router()

router.get(`/garage/v1.0/vehicles`, getVehicles)
router.post('/garage/v1.0/vehicle', postVehicle)

export default router
