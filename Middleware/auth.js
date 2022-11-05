const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const User = require('../Models/User')
const authentication=async(req,res,next)=>{
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
                const data=jwt.verify(token,process.env.SecretKey)
                //console.log(data)
                const user=await User.findOne({email:data.email})
                if(!user)
                return res.status(401).json({error:'Unauthorized'})
            } catch (error) {
                return res.status(400).json({error:'Invalid Token'})
            }
        }
        else
        return res.status(400).json({error:'Invalid Token'})
    }
}catch (error) {
    res.status(401).send(error.message)
}
next()
}
const authorization=async(req,res,next)=>{
    try{
        let token=req.header('AuthorizeUser')
        if(typeof(token)==="undefined")
        return res.status(401).json({error:'Unauthorized'})
        else
        {
        if(token.startsWith('Bearer ')){
            token=token.slice(7,token.length)
        }
        if(token)
        {
            try{
                const data=jwt.verify(token,process.env.SecretKey)
                const user=await User.findOne({email:data.email})
                if(!user || user.role!='admin')
                return res.status(401).json({error:'Unauthorized'})
            }
            catch(error)
            {
                return res.status(400).json({error:error.message})
            }
        }
        else
        return res.status(400).json({error:'Invalid Token'})
    }
    }
    catch(error)
    {
        return res.status(404).send({error:error.message})
    }
    next()
}
module.exports={authentication,authorization}