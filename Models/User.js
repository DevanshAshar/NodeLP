const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
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
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
},{timestamps:true})

userSchema.pre('save',async function(next){
    if(this.isModified('password'))
    {
        this.password=await bcrypt.hash(this.password,9)
    }
    next()
})
userSchema.methods.generateAuthToken=async function(){
    try {
        let token=jwt.sign({_id:this._id},process.env.SecretKey)
        this.tokens=this.tokens.concat({token})
        await this.save()
        return token
    } catch (error) {
        console.log(error)
    }
}
const User=mongoose.model('User',userSchema)
module.exports=User