const express=require('express')
const router=new express.Router()
const authentication=require('../Middleware/auth')
const {
    newProduct,
    products,
    seller,
    prodname,
    brand,
    category,
    updateProd,
    deleteProd
}=require('../Controllers/Product')
router.post('/newProduct',[authentication.verifyToken,authentication.seller],newProduct)
router.get('/products',products)
router.get('/seller/:seller',seller)
router.get('/:id',prodname)
router.get('/brand/:brand',brand)
router.get('/category/:category',category)
router.patch('/:id',[authentication.verifyToken,authentication.modifyProduct],updateProd)
router.delete('/:id',[authentication.verifyToken,authentication.modifyProduct],deleteProd)
module.exports=router