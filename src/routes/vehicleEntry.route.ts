import express = require('express')
//import authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router()
import vehicleEntryController = require('../controllers/vehicleEntry.controller')
import multer = require('multer')
import crypto = require('crypto')
import mime = require('mime')
import path = require('path')

const storage = multer.diskStorage({
  destination: path.join('uploads/'),
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(4, function (err, raw) {
      const mime_type = mime.getType(file.originalname)

      // throw away any extension if provided
      const nameSplit = file.originalname.split('.').slice(0, -1)
      //nameSplit.pop();

      // replace all white spaces with - for safe file name on different filesystem
      const name = nameSplit.join('.').replace(/\s/g, '-')
      cb(null, raw.toString('hex') + name + '.' + mime.getExtension(mime_type))
    })
  },
})

const upload = multer({ storage })

const fields = [{ name: 'vehicleImage', maxCount: 1 }]
const imageUploads = upload.fields(fields)

// Check In (Create Visitor)
router.post('/product/reception/user/checkin', /*authMiddleware,*/ imageUploads, vehicleEntryController.checkIn)
router.get('/product/reception/checkin/user/data' /*authMiddleware,*/, vehicleEntryController.getVehic)
router.post('/product/reception/user/checkout' /*authMiddleware,*/, vehicleEntryController.checkOut)
router.get('/product/reception/meeting/purpose/data' /*authMiddleware,*/, vehicleEntryController.getPurpose)

module.exports = router
