const express=require('express')
const router=new express.Router()
const{
    authentication,
    authorization
}=require('../Middleware/auth')
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
router.get('/users',authorization,users)
router.get('/customers',authorization,customers)
router.get('/sellers',authorization,sellers)
router.get('/:id',authentication,username)
router.patch('/:id',authentication,updateUser)
router.delete('/:id',authentication,deleteUser)
module.exports=router