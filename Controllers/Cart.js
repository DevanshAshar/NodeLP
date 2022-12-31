const Product=require('../Models/Product')
const User=require('../Models/User')

const addCart=async(req,res)=>{
    const {prodName,Quantity}=req.body   
    const prod=await Product.findOne({prodName:req.body.prodName})
    if(!prod)
    return res.status(400).json({message:'Item not found'})
    try{
        await User.findByIdAndUpdate(userData._id,{
            $addToSet:{
                cart:{
                    product:{
                    prodName:prod.prodName,
                    price:prod.price,
                    image:prod.image,
                    quantity:req.body.Quantity
                    }
                }
            }
            })
            
        
        await userData.save()
        res.status(200).json({message:'Added to cart',userData})
    }catch(error){
        res.status(400).json({error:'Error'})
    }
}
const delCart=async(req,res)=>{
    const prodName=req.body
    const prod=await Product.findOne({prodName:req.body.prodName})
            try{
            userData.cart=userData.cart.filter((product)=>{
                return product.product.prodName!==req.body.prodName})
                res.status(200).json({message:'removed from cart',userData})
                await userData.save()
            }catch(err){
                res.status(400).json({error:err.message})
            }
        }


module.exports={addCart,delCart}