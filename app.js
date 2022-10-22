const express=require('express')
const user=require('../E-Commerce/Routes/User')
const prod=require('../E-Commerce/Routes/Product')
const app=express()
app.use(express.json())
app.use('/user',user)
app.use('/product',prod)
app.use((req,res,next)=>{
    res.status(404) 
    res.json({
        error:'not found'
    })
})
app.listen(5000)