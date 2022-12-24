const router = require('express').Router()
const userControllers = require('../controllers/userControllers')
const auth = require('../middleware/auth')

router.post('/register',userControllers.register)
router.get('/refresh_token',userControllers.refreshToken)
router.post('/login',userControllers.login)
router.get('/logout',userControllers.logout)
router.get('/infor',auth,userControllers.getuser)
router.patch('/addcart',auth,userControllers.addcart)

module.exports = router

