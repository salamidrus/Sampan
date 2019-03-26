const router = require('express').Router(),
    multer = require('../middleware/multer'),
    userControllers = require('../controllers/user'),
    authControllers = require('../middleware/authUser')

router.put('/', multer.uploadAvatar.single('avatar'), authControllers.verify, userControllers.update)
router.delete('/', authControllers.verify, userControllers.delete)
router.get('/', authControllers.verify, userControllers.showProfil)

module.exports = router
