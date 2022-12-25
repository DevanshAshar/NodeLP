const express=require('express')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()
const app=express()
const User=require('../Models/User')
const nodemailer=require('nodemailer')
const multer=require('multer')
const SecretKey="QWERTYUIOPASDFGHJKLZXCVBNM1234567890"
const Product = require('../Models/Product')
var upload=multer({dest:'uploads/'})
const cloudinary=require('cloudinary').v2
cloudinary.config({
    cloud_name:"dpfxl2odl",
    api_key:"477525826251791",
    api_secret:"_zp9D4i_GJNc5QNjMob8OcKP2w4"
})
app.use(express.json()) 
const newUser=async(req,res)=>{
    const {username, password, email, address, mobile, role}=req.body;
    if(!username || !password || !email || !address || !mobile || !role)
    return res.status(400).json({error:"Please fill the necessary details "})
    const user=new User(req.body)
    try {
        await user.save()
        var transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'try.user99@gmail.com',
                pass:'zrzoezntywioiuea'
            }
        })
        var mailOptions={
            from:'try.user99@gmail.com',
            to:req.body.email,
            subject:'Succesfully Registered',
            text:'Your account has been created successfully , Enjoy shopping !!!'
        }
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
             // console.log('Email sent: ' + info.response);
            }
          });
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
            return res.status(400).json({error:'User not found'})
            const validPassword=await bcrypt.compare(req.body.password,userData.password)
            if(!userData || !validPassword || userData.role!=req.body.role)
            res.status(400).json({error:'Invalid credentials'})
            else
            {
               const token=jwt.sign({email:req.body.email},SecretKey,{expiresIn:'1d'})
               let oldTokens=User.tokens || []
               if(oldTokens.length){
                oldTokens=oldTokens.filter(t=>{
                    timeDiff=(Date.now()-parseInt(t.signedAt))/1000
                    if(timeDiff<86400){
                        return t
                    }
                })
               }
               await User.findByIdAndUpdate(userData._id,{tokens:[...oldTokens,{token,signedAt: Date.now().toString()}]})
               userData.tokens=userData.tokens.concat({token})
               await userData.save()
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
const logout=async(req,res)=>{
    try{
        if(req.headers){
            const token=req.headers   
            if(!token){
                res.status(400).json({message: 'Auth failed'})
            }
            else{
                const tokens=userData.tokens
                await User.findByIdAndUpdate(userData._id,{tokens:[]})
                res.status(200).json({message:'Successfully logged out'})
            }
        }
    }catch(error){
        res.status(400).json({error:'Error'})
    }
}

const profilePic=async(req,res)=>{

    const profile=await cloudinary.uploader.upload(req.file.path)
    try{
        await User.findByIdAndUpdate(userData._id,{image:profile.url})
        res.send(req.file)
    }catch(err){
        res.status(400).json({error:'Error'})
    }
}

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./upload')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
var upload=multer({storage:storage})

const sellerProd=async(req,res)=>{
    try{
        const products=await Product.find({sellerEmail:userData.email})
        res.status(200).json(products)
    }catch(error){
        res.status(400).json({error:'Error'})
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
    profilePic,
    logout,
    sellerProd,
    deleteUser
}