import express from 'express'
//import authMiddleware = require('../middlewares/auth.middleware')
import {} from '../middlewares/auth.middleware'
const router = express.Router()
import vehicleEntryController from '../controllers/vehicleEntry.controller'
import multer from 'multer'
import crypto from 'crypto'
import mime from 'mime'
import path from 'path'

const storage = multer.diskStorage({
  destination: path.join('uploads/'),
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(4, function (err, raw) {
      const mime_type = mime.lookup(file.originalname)

      // throw away any extension if provided
      const nameSplit = file.originalname.split('.').slice(0, -1)
      //nameSplit.pop();

      // replace all white spaces with - for safe file name on different filesystem
      const name = nameSplit.join('.').replace(/\s/g, '-')
      cb(null, raw.toString('hex') + name + '.' + mime.extension(mime_type))
    })
  },
})

const upload = multer({ storage })

const fields = [{ name: 'vehicleImage', maxCount: 1 }]
const imageUploads = upload.fields(fields)

// Check In (Create Visitor)
router.post('/garage/v1.0/checkin', /*authMiddleware,*/ vehicleEntryController.checkIn)
router.get('/garage/v1.0/vehicle-entries' /*authMiddleware,*/, vehicleEntryController.getVehicleEntries)
router.post('/garage/v1.0/checkout' /*authMiddleware,*/, vehicleEntryController.checkOut)

export default router
