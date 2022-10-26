const express=require('express')
const router=new express.Router()
const {
    newUser,
    users,
    customers,
    sellers,
    username,
    updateUser,
    deleteUser
}=require('../Controllers/User');
router.post('/newUser',newUser)
router.get('/users',users)
router.get('/customers',customers)
router.get('/sellers',sellers)
router.get('/:id',username)
router.patch('/:id',updateUser)
router.delete('/:id',deleteUser)
module.exports=router