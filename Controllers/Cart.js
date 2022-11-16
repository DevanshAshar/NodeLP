const Product=require('../Models/Product')
const User=require('../Models/User')

const cart=async(req,res)=>{
    const prodName=req.body
    const prod=await Product.findOne(prodName)
    console.log(prod.prodName)
    const user=userData
    if(!prod)
    res.status(400).json({message:'Item not found'})
    try{
        await User.findByIdAndUpdate(userData._id,{
            cart:{
                prodName:prod.prodName
            }
        })
        await user.save()
        res.status(200).json({message:'Added to cart'})
    }catch(error){
        res.status(400).json({error:'Error'})
    }
}
module.exports=cart