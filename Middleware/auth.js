const jwt = require('jsonwebtoken')
const Product = require('../Models/Product')
const dotenv = require('dotenv').config({path:"./config.env"})
const User = require('../Models/User')
const authentication={

    verifyToken:async(req,res,next)=>{
    try {
        let token=req.header('AuthenticateUser')
        if(typeof(token)==="undefined")
        return res.status(401).json({error:'Unauthorized'})
        else
        {
        if(token.startsWith('Bearer ')){
        token=token.slice(7,token.length)
        }
        if(token)
        {
            try {
                const data=jwt.verify(token,"QWERTYUIOPASDFGHJKLZXCVBNM1234567890")
                const user=await User.findOne({email:data.email,token:token})
                userData=user
                next()
            } catch (error) {
                return res.status(400).json({error:'Invalid Token'})
            }
        }
    }
}catch (error) {
    return res.status(401).send(error.message)
}
},

verifyUser:async(req,res,next)=>{
    try {
        const user=await User.findById(req.params.id)
        if(user.email===userData.email)
        next()
        
        else
        return res.status(401).json({error:'invalid user'})
    } catch (error) {
        res.status(404).json({error:error.message})
    }
},

seller:async(req,res,next)=>{
    try {
        if(userData.role==='seller')
        next()
        else
        return res.status(401).json({error:'not a seller'})
    } catch (error) {
       res.status(404).json({error:error.message}) 
    }
},


modifyProduct:async(req,res,next)=>{
    try {
        prodData=await Product.findById(req.params.id)
        if(prodData.sellerEmail===userData.email)
        next()
        else
        return res.status(401).json({error:'invalid seller'})
    } catch (error) {
        res.status(404).json({error:error.message})
    }
},


admin:async(req,res,next)=>{
    try {
        if(userData.role==='admin')
        next()
        else
        return res.status(401).json({error:'not an admin'})
    } catch (error) {
       res.status(404).json({error:error.message}) 
    }
}

}

module.exports=authentication