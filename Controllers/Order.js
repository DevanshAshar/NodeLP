const User=require('../Models/User')
const Product=require('../Models/Product')
const Order=require('../Models/Order')
const nodemailer=require('nodemailer')
const order=async(req,res)=>{
    const {prodName,quantity}=req.body
    try{
        const user=userData
        const prod=await Product.findOne({prodName:prodName})
        const o=new Order({
            username:userData.username,
            email:userData.email,
            address:userData.address,
            productName:prod.productName,
            cost:prod.price*parseInt(quantity),
            quantity:quantity
        })
        var transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.email,
                pass:process.env.pass
            }
        })
        var mailOptions={
            from:process.env.email,
            to:userData.email,
            subject:' Order has been placed',
            //order details 
            text:'Thank you for Ordering',
            text:prodName,
            text:o.address
        }
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        res.status(200).json({message:'Order has been placed'})
    }catch(error){
        res.status(400).json({error:'Error'})
    }
}
module.exports=order