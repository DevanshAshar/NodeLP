const express=require('express')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const app=express()
const Product=require('../Models/Product')
app.use(express.json())
const newProduct=async(req,res)=>{
    const {prodId,prodName, brand, model, price, category, specs,image,seller,password}=req.body;
    if(!prodId || !prodName || !brand || !model|| !price || !category|| !specs || !image || !seller || !password)
    return res.status(400).json({error:"Please fill the necessary details "})
    const prod=new Product(req.body) 
    try {
        await prod.save()
        res.json({message:'Success'}).status(200)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const sellerLogin=async(req,res)=>{
    const {prodId,seller,password}=req.body
    if(!prodId || !seller || !password)
    return res.status(401).json({error:'Please fill the necessary details'})
    try {
        const prodData=await Product.findOne({prodId:req.body.prodId})
        if(!prodData)
        res.status(400).json({error:'product not found'})
        const validPassword=await bcrypt.compare(req.body.password,prodData.password)
        if(!prodData || !validPassword || prodData.seller!=req.body.seller)
            res.status(400).json({error:'Invalid credentials'})
            else
            {
               const token=jwt.sign({prodId:req.body.prodId},process.env.SecretKey)
                return res.status(200).json({token:token,prodData})
            }
    } catch (error) {
        res.status(404).send(error.message)
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
module.exports={
    newProduct,
    sellerLogin,
    products,
    seller,
    prodname,
    brand,
    category,
    updateProd,
    deleteProd
}