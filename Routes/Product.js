const express=require('express')
const router=new express.Router()
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
router.post('/newProduct',newProduct)
router.get('/products',products)
router.get('/seller/:seller',seller)
router.get('/:id',prodname)
router.get('/brand/:brand',brand)
router.get('/category/:category',category)
router.patch('/:id',updateProd)
router.delete('/:id',deleteProd)
module.exports=router