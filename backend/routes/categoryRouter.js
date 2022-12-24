const router = require('express').Router()
const categoryControllers = require('../controllers/categoryControllers')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.get('/category',categoryControllers.getCategories)
router.post('/category',auth,authAdmin,categoryControllers.createCategory)
router.delete('/category/:id',auth,authAdmin,categoryControllers.deleteCategory)
router.put('/category/:id',auth,authAdmin,categoryControllers.updateCategory)

module.exports = router