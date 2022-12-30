const User=require('../Models/User')
const Product=require('../Models/Product')
const Order=require('../Models/Order')
const nodemailer=require('nodemailer')
let mailTransporter=nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:"try.user99@gmail.com",
    pass:"juubuhmyejlursur"
  }
})
const directOrder=async(req,res)=>{
    const {prodId,Quantity}=req.body
    try {
        const user=userData
        const prod=await Product.findById(prodId)
        if(req.body.Quantity>prod.Quantity)
        return res.status(200).json({message:'Product sold out!!!'})

       const price=prod.price*(Number(req.body.Quantity))
        const order=new Order({
            username:user._id,
            username:user.username,
            email:user.email,
            address:user.address,
            Number:user.Number,
            totalPrize:price,
            cart:[{
                product:{
                        productName:prod.productName,
                        prodId:prod._id,
                        prize:prod.prize,
                        Quantity:req.body.Quantity
                }
            }]
        })
        prod.Quantity-=req.body.Quantity
        prod.save()
        let details={
            from:"try.user99@gmail.com",
            to:user.email,
            subject:"Order Details",
            text:JSON.stringify(order)
            
                
          }
          mailTransporter.sendMail(details,(err)=>{
            if(err)
            console.log('not sent' ,err.message)
            else
            console.log('email sent')
          })
        res.status(200).json({order})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const cartOrder=async(req,res)=>{
    try {
        let prod,i=0,price=0
        const user=userData
        var cart=(user.cart)
        if(cart.length===0)
        return res.status(200).json({message:'cart is empty'})
        for (const product of cart) {
            let p=cart[i].product
            prod=await Product.findOne({prodName:p.prodName})
            if(prod.quantity<p.quantity)
            return res.status(400).json('product sold out')
            prod.quantity-=p.quantity
            prod.save()
            price+=p.quantity*prod.price
            let prodDetails={
            productName:prod.productName,
                        prize:prod.price,
                        Quantity:p.quantity
        }
        console.log(prodDetails)
        i++
        }
        user.cart=[]
        await user.save()
        res.status(200).json({message:'order placed',price:price})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
module.exports={directOrder,cartOrder}