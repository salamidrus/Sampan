const router = require('express').Router(),
    multer = require('../middleware/multer'),
    userControllers = require('../controllers/user')

router.get('/', userControllers.test)
router.post('/signup', multer.uploadAvatar.single('avatar'), userControllers.signup)
router.post('/login', userControllers.login)

module.exports = router