const express=require('express')
const router=new express.Router()
const {authentication,authorization}=require('../Middleware/prodAuth')
const {
    newProduct,
    sellerLogin,
    sellerCreateProd,
    products,
    seller,
    prodname,
    brand,
    category,
    updateProd,
    deleteProd
}=require('../Controllers/Product')
router.post('/newProduct',authorization,newProduct)
router.post('/sellerCreateProd',sellerCreateProd)
router.post('/sellerLogin',sellerLogin)
router.get('/products',products)
router.get('/seller/:seller',seller)
router.get('/:id',prodname)
router.get('/brand/:brand',brand)
router.get('/category/:category',category)
router.patch('/:id',authentication,updateProd)
router.delete('/:id',authentication,deleteProd)
module.exports=router