const multer = require('multer')
const path = require('path')

const storageAvatar = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, `${req.body.title}-${Date.now()}.${file.originalname.split('.')[file.originalname.split('.').length -1]}`)
      // cb(null, Date.now() + '.jpg')
      // cb(null, `${req.body.title}.jpg`)
    },
})

const filefilter = (req, file, cb) => {
    var ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return cb ({message: 'Only images are allowed', status: 422})
    }
    cb(null, true)
}

exports.uploadAvatar = multer({ storage: storageAvatar, fileFilter: filefilter })