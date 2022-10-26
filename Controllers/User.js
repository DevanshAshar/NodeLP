const express=require('express')
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
    users,
    customers,
    sellers,
    username,
    updateUser,
    deleteUser
}