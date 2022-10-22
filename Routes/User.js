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
router.get('/:username',username)
router.put('/',updateUser)
router.delete('/:username',deleteUser)
module.exports=router