const express=require('express')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()
const app=express()
const User=require('../Models/User')
const nodemailer=require('nodemailer')
const fast2sms=require('fast-two-sms')
const Razorpay=require('razorpay')
const cors=require('cors')
const mime=require('mime')
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
app.use(cors())
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
    try {
        const user=userData
        let tkn=req.headers['authenticateuser']
        tkn=tkn.slice(7,tkn.length)
        user.tokens=user.tokens.filter((token)=>{
            return token.token!=tkn;
        })
        res.status(200).json({message:'Logged Out'})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const logoutAll=async(req,res)=>{
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

const profilePic = async (req, res) => {
    try {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(req.file.path, { allowed_formats: ['jpg', 'jpeg', 'png'] }, function(error, result) {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
  
      const profile = uploadResult;
      await User.findByIdAndUpdate(userData._id, { image: profile.url });
      res.send(req.file);
    } catch (err) {
      res.status(400).json({ error: 'Error' });
    }
  };
const sellerProd=async(req,res)=>{
    try{
        const products=await Product.find({sellerEmail:userData.email})
        res.status(200).json(products)
    }catch(error){
        res.status(400).json({error:'Error'})
    }
}
const forgotPass=async(req,res)=>{
    const {username,mobile,email}=req.body
    try{
        const user=await User.find({mobile:req.body.mobile})
        if(!user)
        return res.status(400).json({error:"user not found"})
        const resp=await fast2sms.sendMessage({authorization:"IsW0for5wdOuTn69lB7q2yCAMH8JXxhz4gtDYKP3UVN1veQaGjZMDUyGTg7p86a3EOnzFWt2KoV01xiQ",message:"Your OTP is 1234 devansh testing",numbers:[req.body.mobile]})//just for testing
        console.log(resp)
        res.status(200).json({message:'OTP sent'}) 
    }
    catch(err){
        res.status(400).json(err.message)
    }
}
const payment=async(req,res)=>{
    let amount=req.body
    var instance = new Razorpay({ key_id: 'rzp_test_NOaMnv64SC7X1y', key_secret: 'thr0tRAcA5sFS4Fz8rxGjp29' })

let order=instance.orders.create({
  amount: amount*100,
  currency: "INR",
  receipt: "receipt#1",
})
res.status(201).json({order})
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
    logoutAll,
    sellerProd,
    forgotPass,
    deleteUser
}