const express=require('express')
const morgan=require('morgan')
const user=require('./Routes/User')
const prod=require('./Routes/Product')
const app=express()
require('./dbConnect')
app.use(express.json())
app.use(morgan('dev'))
app.use('/user',user)
app.use('/product',prod)
app.use((req,res,next)=>{
    res.status(404) 
    res.json({
        error:'not found'
    })
})
app.listen(3000)