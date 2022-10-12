const mongoose=require('mongoose')
const custSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    adress:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    }

})