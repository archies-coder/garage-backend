import { Router } from 'express'
import {
  getVehicleImage,
  getVehicles,
  postVehicle,
} from '../controllers/vehicle.controller'

const router: Router = Router()

router.get('/vehicles', getVehicles)
router.get('/vehicles/image/:id', getVehicleImage)
router.post('/vehicle', postVehicle)

export default router
