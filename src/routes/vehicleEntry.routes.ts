import express from 'express'
//import authMiddleware = require('../middlewares/auth.middleware')
import { authMiddleware } from '../middlewares/auth.middleware'
const router = express.Router()
import vehicleEntryController from '../controllers/vehicleEntry.controller'
import {
  imageUploadMiddleWare,
  singleImageMiddleware,
} from '../middlewares/imageUpload.middleware'

const fields = [{ name: 'vehicleImage', maxCount: 1 }]
// const imageUploads = imageUploadMiddleWare(fields)
const imageUploads = singleImageMiddleware('vehicleImage')

// Check In (Create Visitor)
router.post(
  '/garage/v1.0/checkin',
  //  authMiddleware,
  imageUploads,
  vehicleEntryController.checkIn,
)
router.get(
  '/garage/v1.0/checkout/:id',
  /*authMiddleware,*/ vehicleEntryController.checkOut,
)
router.get(
  '/garage/v1.0/vehicle-entries' /*authMiddleware,*/,
  vehicleEntryController.getVehicleEntries,
)
// router.post('/garage/v1.0/checkout' /*authMiddleware,*/, vehicleEntryController.checkOut)

export default router
