const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const orderSchema=new Schema({
    userId:{
        type:String
    },
    username:{
        type:String
    },
    email:{
        type:String
    },
    address:{
        type:String
    },
    Number:{
        type:String
    },
    totalPrize:{
        type:Number
    },
    cart:[{
        product:{productName:{
            type:String,
        },
        prodId:{type:String},
        prize:{
            type:Number,
        },
        Quantity:{
            type:Number
        }
    },

        
    }]
})

const Order=mongoose.model('Order',orderSchema)
module.exports=Order