const Product=require('../Models/Product')
const User=require('../Models/User')

const addCart=async(req,res)=>{
    const {prodName,Quantity}=req.body   
    const prod=await Product.findOne({prodName:req.body.prodName})
    if(!prod)
    res.status(400).json({message:'Item not found'})
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
       /* if((req.params.id)>(user.cart[0].quantity)){
            res.status(400).json({message:'Not enough in the cart'})
        }
            var n=(userData.cart.quantity)-(req.params.id)
            if(n===0){
                //when all items from the cart are deleted s
                 User.findByIdAndUpdate(userData._id,{
                   
                        cart:{
                        }
                    
                })
                res.status(200).json({message:'Cart Updated'})
            }
            else{
                 User.findByIdAndUpdate(userData._id,{
                    cart:{
                        prodName:prod.prodName,
                        price:prod.price,
                        image:prod.image,
                        quantity:n
                    }
                })
                res.status(200).json({message:'Cart Updated'})
            }*/
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