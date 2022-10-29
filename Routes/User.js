const express=require('express')
const router=new express.Router()
const {
    newUser,
    userLogin,
    users,
    customers,
    sellers,
    username,
    updateUser,
    deleteUser
}=require('../Controllers/User');
router.post('/newUser',newUser)
router.post('/userLogin',userLogin)
router.get('/users',users)
router.get('/customers',customers)
router.get('/sellers',sellers)
router.get('/:id',username)
router.patch('/:id',updateUser)
router.delete('/:id',deleteUser)
module.exports=router