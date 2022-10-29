const express=require('express')
const bcrypt=require('bcrypt')
const app=express()
const User=require('../Models/User')
app.use(express.json()) 
const newUser=async(req,resp)=>{
    const {username, password, email, address, mobile, role}=req.body;
    if(!username || !password || !email || !address || !mobile || !role)
    return resp.status(400).json({error:"Please fill the necessary details "})
    const user=new User(req.body)
    try {
        await user.save()
        resp.json({message:'Success'}).status(200)
    } catch (error) {
        resp.status(500).json({message:error.message}) 
    }
}
const userLogin=async(req,resp)=>{
    const {email,password}=req.body
    if(!email || !password)
    return resp.status(400).json({error:'Please Fill the Details'})
    const user=new User(req.body)
    try {
            const userData=await User.findOne({email:req.body.email})
            const validPassword=await bcrypt.compare(req.body.password,userData.password)
            if(!userData && !validPassword)
            resp.status(400).json({error:'user not found'})
            else
            resp.status(200).send(userData)
    } catch (error) {
        resp.status(404).send(error.message)
    }
}   
const users=async(req,resp)=>{
    try {
        let data=await User.find()
        resp.send(data).status(200)
    } catch (error) {
        resp.status(500).json({message:error.message}) 
    }
}
const customers=async(req,resp)=>{
   try {
    let data=await User.find({role:'customer'})
    resp.send(data).status(200)
   } catch (error) {
    resp.status(500).json({message:error.message}) 
   }
}
const sellers=async(req,resp)=>{
    try {
        let data=await User.find({role:'seller'})
        resp.send(data).status(200)
    } catch (error) {
        resp.status(500).json({message:error.message})
    }
}
const username=async(req,resp)=>{
    try {
        let data=await User.findById(req.params.id)
        if(data!=null)
        resp.send(data).status(200)
        else
        resp.status(300).json({message:'User not found'})
    } catch (error) {
        resp.status(500).json({message:error.message})
    }
}
const updateUser=async(req,resp)=>{
    try {
        let result= await User.findByIdAndUpdate(req.params.id,req.body)
        resp.status(200).json({message:'Updated'})
    } catch (error) {
        resp.status(500).json({message:error.message})
    }
}
const deleteUser=async(req,resp)=>{
    try {
        let result=await User.findByIdAndDelete(req.params.id)
        if(result!=null)
        resp.send(result).status(200)
        else
        resp.status(300).json({message:'User not found'})
    } catch (error) {
        resp.status(500).json({message:error.message})
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