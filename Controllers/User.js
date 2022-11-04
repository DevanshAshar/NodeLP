const express=require('express')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const app=express()
const User=require('../Models/User')
app.use(express.json()) 
const newUser=async(req,res)=>{
    const {username, password, email, address, mobile, role}=req.body;
    if(!username || !password || !email || !address || !mobile || !role)
    return res.status(400).json({error:"Please fill the necessary details "})
    const user=new User(req.body)
    try {
        await user.save()
        res.json({message:'Success'}).status(200)
    } catch (error) {
        res.status(500).json({message:error.message}) 
    }
}
const userLogin=async(req,res)=>{
    const {email,password,role}=req.body
    if(!email || !password || !role)
    return res.status(400).json({error:'Please Fill the Details'})
    try {
            const userData=await User.findOne({email:req.body.email})
            if(!userData)
            res.status(400).json({error:'User not found'})
            const validPassword=await bcrypt.compare(req.body.password,userData.password)
            if(!userData || !validPassword || userData.role!=req.body.role)
            res.status(400).json({error:'Invalid credentials'})
            else
            {
               const token=jwt.sign({email:req.body.email},process.env.SecretKey)
                return res.status(200).json({token:token,userData})
            }
    } catch (error) {
        res.status(404).send(error.message)
    } 
}
  
const users=async(req,res)=>{
    try {
        let data=await User.find()
        res.send(data).status(200)
    } catch (error) {
        res.status(500).json({message:error.message}) 
    }
}
const customers=async(req,res)=>{
   try {
    let data=await User.find({role:'customer'})
    res.send(data).status(200)
   } catch (error) {
    res.status(500).json({message:error.message}) 
   }
}
const sellers=async(req,res)=>{
    try {
        let data=await User.find({role:'seller'})
        res.send(data).status(200)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const username=async(req,res)=>{
    try {
        let data=await User.findById(req.params.id)
        if(data!=null)
        res.send(data).status(200)
        else
        res.status(300).json({message:'User not found'})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const updateUser=async(req,res)=>{
    try {
        let result= await User.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).json({message:'Updated'})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const deleteUser=async(req,res)=>{
    try {
        let result=await User.findByIdAndDelete(req.params.id)
        if(result!=null)
        res.send(result).status(200)
        else
        res.status(300).json({message:'User not found'})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
module.exports={
    newUser,
    userLogin,
    users,
    customers,
    sellers,
    username,
    updateUser,
    deleteUser
}