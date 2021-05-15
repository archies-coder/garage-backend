import { Router } from 'express'
import {
  getVehicleImage,
  getVehicles,
  postVehicle,
} from '../controllers/vehicle.controller'

const router: Router = Router()

router.get(`/garage/v1.0/vehicles`, getVehicles)
router.get(`/garage/v1.0/vehicles/image/:id`, getVehicleImage)
router.post('/garage/v1.0/vehicle', postVehicle)

export default router
