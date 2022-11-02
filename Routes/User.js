const express=require('express')
const router=new express.Router()
const auth=require('../Middleware/auth')
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
router.get('/users',auth,users)
router.get('/customers',auth,customers)
router.get('/sellers',auth,sellers)
router.get('/:id',auth,username)
router.patch('/:id',auth,updateUser)
router.delete('/:id',auth,deleteUser)
module.exports=router