import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname} `)
  }
})

const upload = multer({storage})
// Middleware to handle file uploads
// This middleware will save the uploaded files to the 'public/temp' directory with a timestamp in the filename
export {upload}
