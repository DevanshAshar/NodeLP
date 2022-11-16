const express=require('express')
const jwt=require('jsonwebtoken')
const app=express()
const Product=require('../Models/Product')
const User = require('../Models/User')
const multer=require('multer')
const fs=require('fs')
var upload=multer({dest:'uploads/'})
var cartProd=[]
app.use(express.json())

const newProduct=async(req,res)=>{
    const {prodId,prodName, brand, model, price, category, specs,image,seller,sellerEmail}=req.body;
    if(!prodId || !prodName || !brand || !model|| !price || !category|| !specs || !image || !seller || !sellerEmail)
    return res.status(400).json({error:"Please fill the necessary details "})
    const sellerData=await User.findOne({email:sellerEmail})
    if(!sellerData)
    return res.status(400).json({error:'Invalid credentials'})
    const prod=new Product(req.body) 
    try {
        await prod.save()
        res.json({message:'Success'}).status(200)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const products=async(req,res)=>{
    try {
        let data=await Product.find()
        res.send(data).status(200)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const seller=async(req,res)=>{
    try {
        let data=await Product.find({seller:req.params.seller})
        res.send(data).status(200)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const prodname=async(req,res)=>{
    try {
        let data=await Product.findById(req.params.id)
        if(data!=null)
        res.send(data).status(200)
        else
        res.status(300).json({message:'Product not found'})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const brand=async(req,res)=>{
    try {
        let data=await Product.find({brand:req.params.brand})
        res.send(data).status(200)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const category=async(req,res)=>{
    try {
        let data=await Product.find({category:req.params.category})
        res.send(data).status(200)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const updateProd=async(req,res)=>{
    try {
        let data=await Product.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).json({message:'Updated'})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const deleteProd=async(req,res)=>{
    try {
        let result=await Product.findByIdAndDelete(req.params.id)
        if(result!=null)
        res.send(result).status(200)
        else
        res.status(300).json({message:'Product not found'})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const productImage=async(req,res)=>{
    try {
        let prod=await Product.findById(req.params.id);
        prod.Image=req.file
        prod=await prod.save()
        res.status(200).json({message:'File Uploaded',prod})
      } catch (error) {
        res.status(400).json({error:'Error'});
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
const prodNo=async(req,res)=>{
    try{
        const data=await User.findById(req.params.id)
    }catch(error){
        res.status(400).json({error:'Error'})
    }

}
const cart=async(req,res)=>{
    const prod=await Product.findById(req.params.id)
    var addCart=[
        {
            prodName:prod.prodName,
            prodId:prod.prodId,
        },
    ]    
}
module.exports={
    newProduct,
    products,
    seller,
    prodname,
    brand,
    category,
    updateProd,
    productImage,
    prodNo,
    cart,
    deleteProd
}