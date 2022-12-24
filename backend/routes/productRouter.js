const router = require("express").Router()
const productControllers = require("../controllers/productControllers")
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.get('/products',productControllers.getProducts)
router.post('/products',auth,authAdmin,productControllers.createProduct)
router.delete('/products/:id',auth,authAdmin,productControllers.deleteProduct)
router.put('/products/:id',auth,authAdmin,productControllers.updateProduct)
module.exports = router