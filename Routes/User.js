const express=require('express')
const router=new express.Router()
const authentication=require('../Middleware/auth')
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
router.get('/users',[authentication.verifyToken,authentication.admin],users)
router.get('/customers',[authentication.verifyToken,authentication.admin],customers)
router.get('/sellers',[authentication.verifyToken,authentication.admin],sellers)
router.get('/:id',[authentication.verifyToken,authentication.verifyUser],username)
router.patch('/:id',[authentication.verifyToken,authentication.verifyUser],updateUser)
router.delete('/:id',[authentication.verifyToken,authentication.verifyUser],deleteUser)
module.exports=router