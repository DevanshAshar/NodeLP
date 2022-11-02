const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const User = require('../Models/User')
const auth=async(req,res,next)=>{
    try {
        let token=req.header('AuthorizeUser')
        if(token.startsWith('Bearer ')){
            token=token.slice(7,token.length)
        }
        if(token)
        {
            try {
                jwt.verify(token,process.env.SecretKey)
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
module.exports=auth