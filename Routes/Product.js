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
    //filterProd
}=require('../Controllers/Product')
router.post('/newProduct',newProduct)
router.get('/products',products)
router.get('/:seller',seller)
router.get('/:prodname',prodname)
router.get('/:brand',brand)
router.get('/:category',category)
//router.get('/:req.params',filterProd)
router.put('/',updateProd)
router.delete('/:prodId',deleteProd)
module.exports=router