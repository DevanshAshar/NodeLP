const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const Product = require('../Models/Product')
const User=require('../Models/User')
const authentication=async(req,res,next)=>{
    try {
        let token=req.header('AuthenticateSeller')
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
                const data=jwt.verify(token,process.env.SecretKey)
                //console.log(data)
                const prod=await Product.findOne({prodId:data.prodId})
                if(!prod)
                return res.status(401).send('Unauthorized')
            } catch (error) {
                return res.status(400).json({error:'Invalid Token'})
            }
        }
        else
        return res.status(400).json({error:'Invalid Token'})
    }
}catch (error) {
    return res.status(401).send(error.message)
}
next()
}
const authorization=async(req,res,next)=>{
    try {
        let token=req.header('AuthorizeSeller')
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
                const data=jwt.verify(token,process.env.SecretKey)
                console.log(data)
                const userData=await User.findOne({username:data.seller})
                if(userData.role!='seller')
                return res.status(401).send('Unauthorized')
            } catch (error) {
                return res.status(400).json({error:'Invalid Token'})
            }
        }
        else
        return res.status(400).json({error:'Invalid Token'})
    }
}catch (error) {
    return res.status(401).send(error.message)
}
next()
}
module.exports={authentication,authorization}