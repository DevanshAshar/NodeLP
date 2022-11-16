const express=require('express')
const router=new express.Router()
const authentication=require('../Middleware/auth')
const multer=require('multer')
const upload=multer({dest:'uploads/'})
const {
    newProduct,
    products,
    seller,
    prodname,
    brand,
    category,
    updateProd,
    deleteProd,
    prodNo,
    productImage,
}=require('../Controllers/Product')
router.post('/newProduct',[authentication.verifyToken,authentication.seller],newProduct)
router.get('/products',[authentication.verifyToken],products)
router.get('/seller/:seller',seller)
router.get('/:id',prodname)
router.get('/brand/:brand',brand)
router.get('/category/:category',category)
router.patch('/:id',[authentication.verifyToken,authentication.modifyProduct],updateProd)
router.delete('/:id',[authentication.verifyToken,authentication.modifyProduct],deleteProd)
router.post('/images/:id',upload.array('product'),[authentication.verifyToken],productImage)
router.get('/sellerProd/:id',[authentication.verifyToken],prodNo)
const cart=require('../Controllers/Cart')
router.post('/cart',[authentication.verifyToken],cart)

module.exports=router