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
router.post('/checkin', authMiddleware, imageUploads, vehicleEntryController.checkIn)
router.get('/checkout/:id', authMiddleware, vehicleEntryController.checkOut)
router.get(
  '/vehicle-entries',
  // authMiddleware,
  vehicleEntryController.getVehicleEntries,
)
router.get(
  '/purposes',
  //  authMiddleware,
  vehicleEntryController.getPurpose,
)
// router.post('/checkout' /*authMiddleware,*/, vehicleEntryController.checkOut)

export default router
