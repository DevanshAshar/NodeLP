const mongoose=require('mongoose')
const prodSchema=new mongoose.Schema({
    prodName:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    specs:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
    
})