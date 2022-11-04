const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const Product = require('../Models/Product')
const authentication=async(req,res,next)=>{
    try {
        let token=req.header('AuthenticateSeller')
        if(token.startsWith('Bearer ')){
            token=token.slice(7,token.length)
        }
        if(token)
        {
            try {
                const data=jwt.verify(token,process.env.SecretKey)
                console.log(data)
                const prod=await Product.findOne({prodId:data.prodId})
                if(!prod)
                res.status(401).send('Unauthorized')
            } catch (error) {
                res.status(400).json({error:'Invalid Token'})
            }
        }
        else
        res.status(400).json({error:'Invalid Token'})
}catch (error) {
    res.status(401).send(error.message)
}
next()
}
module.exports=authentication