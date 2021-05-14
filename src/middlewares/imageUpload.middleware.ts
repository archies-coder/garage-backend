import multer from 'multer'
import crypto from 'crypto'
import mime from 'mime'
import path from 'path'

import { vehicleImageBucket } from '../database/firebase'
import { format } from 'util'

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

export const uploadImageToStorage = (file: {
  originalname: any
  mimetype: any
  buffer: any
}) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No image file')
    }
    const newFileName = `${file.originalname}_${Date.now()}`

    const fileUpload = vehicleImageBucket.file(newFileName)

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    })

    blobStream.on('error', error => {
      reject('Something is wrong! Unable to upload at the moment.')
    })

    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = format(
        `https://storage.googleapis.com/${vehicleImageBucket.name}/${fileUpload.name}`,
      )
      resolve(url)
    })

    blobStream.end(file.buffer)
  })
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
})

export function singleImageMiddleware(field: string) {
  return upload.single(field)
}

export function imageUploadMiddleWare(fields: readonly multer.Field[]) {
  return upload.fields(fields)
}
