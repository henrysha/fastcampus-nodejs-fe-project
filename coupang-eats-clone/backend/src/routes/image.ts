import { s3Client } from '@/utils/s3Client'
import express from 'express'
import multer from 'multer'
import multerS3 from 'multer-s3'

const router = express.Router()

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_S3_BUCKET ?? '',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.fieldname}_${file.originalname}`)
    },
  }),
})

router.post('/', upload.single('img'), (req, res, next) => {
  const url = (req.file as Express.MulterS3.File).location
  res.status(200).json(url)
})

export default router
