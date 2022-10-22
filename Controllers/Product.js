const express=require('express')
const {MongoClient}=require('mongodb')
const url='mongodb+srv://devanshAshar:devanshNode@cluster0.dedofov.mongodb.net/E-Comm.products?retryWrites=true&w=majority'
const client=new MongoClient(url)
const app=express()
require('../dbConnect')
const Product=require('../Models/Product')
app.use(express.json())
async function dbConnect()
{
    let result=await client.connect()
    let db=result.db('E-Comm')
    return db.collection('products')
}
const newProduct=async(req,resp)=>{
    const {prodId,prodName, brand, model, price, category, specs,image,seller}=req.body;
    if(!prodId || !prodName || !brand || !model|| !price || !category|| !specs || !image || !seller)
    return resp.status(400).json({error:"Please fill the necessary details "})
    const prod=new Product({prodId,prodName, brand, model, price, category, specs,image,seller})
    prod.save().then(()=>{
        resp.status(200).json({message:"Success"})
    }).catch((err)=>resp.status(500).json({error:"error"}))
}
const products=async(req,resp)=>{
    let data=await dbConnect();
    data=await data.find().toArray();
    resp.send(data).status(200)
}
const seller=async(req,resp)=>{
    let data=await dbConnect();
    data=await data.find({seller:req.params.seller}).toArray()
    resp.send(data).status(200)
}
const prodname=async(req,resp)=>{
    let data=await dbConnect();
    data=await data.find({prodName:req.params.prodname}).toArray()
    resp.send(data).status(200)
}
const brand=async(req,resp)=>{
    let data=await dbConnect();
    data=await data.find({brand:req.params.brand}).toArray()
    resp.send(data).status(200)
}
const category=async(req,resp)=>{
    let data=await dbConnect();
    data=await data.find({category:req.params.category}).toArray()
    resp.send(data).status(200)
}
const updateProd=async(req,resp)=>{
    let data=await dbConnect()
    let result=await data.updateOne(
        {prodId:req.body.prodId},
        {$set:req.body}
    )
    let updatedData=await data.find({prodId:req.body.prodId}).toArray()
    resp.send(updatedData).status(200)
}
const deleteProd=async(req,resp)=>{
    let data=await dbConnect()
    let result=await data.deleteOne({username:req.params.prodId})
    resp.status(200).send(result)
}
/*const filterProd=async(req,resp)=>{
    let data=await dbConnect()
    let result=await data.find({req.params:req.body}).toArray()
    resp.send(data).status(200)
}*/
module.exports={
    newProduct,
    products,
    seller,
    prodname,
    brand,
    category,
    updateProd,
    deleteProd
    //filterProd
}