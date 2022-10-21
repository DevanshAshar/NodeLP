const mongoose=require('mongoose')
const validator=require('validator')
const custSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:[true,'username already exists']
    },
    password:{
        type:String,
        required:true,
        minlength:[8,'Password must contain minimum 8 characters ']
    },
    email:{
        type:String,
        required:true,
        unique:[true,'email-id exists'],
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email-Id')
            }
        }
    },
    address:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:[true,'mobile no. exists'],
        length:[10,'Mobile Number must be 10 digits ']
    },
    role:{
        type:String,
        required:true,
        enum:['customer','seller']
    }
})
const User=mongoose.model('User',custSchema)
module.exports=User