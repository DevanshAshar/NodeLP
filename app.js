const express=require('express')
const morgan=require('morgan')
const user=require('./Routes/User')
const prod=require('./Routes/Product')
const app=express()


//change to check co author

//adding 
require('./dbConnect')
app.use(express.json())
app.use(morgan('dev'))
app.use('/user',user)
app.use('/product',prod)
app.use((req,res,next)=>{
    res.status(404).json({
        error:'not found'
    })
})
module.exports=app
app.listen(6000)