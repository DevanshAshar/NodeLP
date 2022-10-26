const express=require('express')
const app=express()
const Product=require('../Models/Product')
app.use(express.json())
const newProduct=async(req,resp)=>{
    const {prodId,prodName, brand, model, price, category, specs,image,seller}=req.body;
    if(!prodId || !prodName || !brand || !model|| !price || !category|| !specs || !image || !seller)
    return resp.status(400).json({error:"Please fill the necessary details "})
    const prod=new Product(req.body) 
    try {
        await prod.save()
        resp.json({message:'Success'}).status(200)
    } catch (error) {
        resp.status(500).json({message:error.message})
    }
}
const products=async(req,resp)=>{
    try {
        let data=await Product.find()
        resp.send(data).status(200)
    } catch (error) {
        resp.status(500).json({message:error.message})
    }
}
const seller=async(req,resp)=>{
    try {
        let data=await Product.find({seller:req.params.seller})
        resp.send(data).status(200)
    } catch (error) {
        resp.status(500).json({message:error.message})
    }
}
const prodname=async(req,resp)=>{
    try {
        let data=await Product.findById(req.params.id)
        if(data!=null)
        resp.send(data).status(200)
        else
        resp.status(300).json({message:'Product not found'})
    } catch (error) {
        resp.status(500).json({message:error.message})
    }
}
const brand=async(req,resp)=>{
    try {
        let data=await Product.find({brand:req.params.brand})
        resp.send(data).status(200)
    } catch (error) {
        resp.status(500).json({message:error.message})
    }
}
const category=async(req,resp)=>{
    try {
        let data=await Product.find({category:req.params.category})
        resp.send(data).status(200)
    } catch (error) {
        resp.status(500).json({message:error.message})
    }
}
const updateProd=async(req,resp)=>{
    try {
        let data=await Product.findByIdAndUpdate(req.params.id,req.body)
        resp.status(200).json({message:'Updated'})
    } catch (error) {
        resp.status(500).json({message:error.message})
    }
}
const deleteProd=async(req,resp)=>{
    try {
        let result=await Product.findByIdAndDelete(req.params.id)
        if(result!=null)
        resp.send(result).status(200)
        else
        resp.status(300).json({message:'Product not found'})
    } catch (error) {
        resp.status(500).json({message:error.message})
    }
}
module.exports={
    newProduct,
    products,
    seller,
    prodname,
    brand,
    category,
    updateProd,
    deleteProd
}