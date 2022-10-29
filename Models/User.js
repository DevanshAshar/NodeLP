const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
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
        length:[10,'Mobile Number must be 10 digits '],
    },
    role:{
        type:String,
        required:true,
        enum:['customer','seller']
    }
},{timestamps:true})

userSchema.pre('save',async function(next){
    if(this.isModified('password'))
    {
        this.password=await bcrypt.hash(this.password,9)
    }
    next()
})
const User=mongoose.model('User',userSchema)
module.exports=User