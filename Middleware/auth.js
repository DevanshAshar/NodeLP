const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const User = require('../Models/User')
const authentication=async(req,res,next)=>{
    try {
        let token=req.header('AuthenticateUser')
        if(token.startsWith('Bearer ')){
            token=token.slice(7,token.length)
        }
        if(token)
        {
            try {
                const data=jwt.verify(token,process.env.SecretKey)
                //console.log(data)
                const user=await User.findOne({email:data.email})
                if(!user)
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
const authorization=async(req,res,next)=>{
    try{
        let token=req.header('AuthorizeUser')
        if(token.startsWith('Bearer ')){
            token=token.slice(7,token.length)
        }
        if(token)
        {
            try{
                const data=jwt.verify(token,process.env.SecretKey)
                const user=await User.findOne({email:data.email})
                if(!user || user.role!='admin')
                res.status(401).send('Unauthorized')
            }
            catch(error)
            {
                res.stats(404).send(error.message)
            }
        }
    }
    catch(error)
    {
        res.status(404).send(error.message)
    }
    next()
}
module.exports={authentication,authorization}