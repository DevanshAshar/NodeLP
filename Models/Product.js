const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const prodSchema=new mongoose.Schema({
    prodId:{
        type:Number,
        required:true,
        unique:[true,'ProdId already taken']
    },
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
    },
    seller:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})
prodSchema.pre('save',async function(next){
    if(this.isModified('password'))
    {
        this.password=await bcrypt.hash(this.password,9)
    }
    next()
})
const Product=mongoose.model('Product',prodSchema)
module.exports=Product