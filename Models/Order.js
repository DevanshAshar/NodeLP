const mongoose=require('mongoose')
const orderSchema=new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    address:{
        type:String
    },
    productName:{
        type:String
    },
    cost:{
        type:Number
    },
    quantity:{
        type:Number
    }
})
const Order=mongoose.model('Order',orderSchema)
module.exports=Order