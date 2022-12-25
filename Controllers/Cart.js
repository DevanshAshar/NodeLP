const Product=require('../Models/Product')
const User=require('../Models/User')

const addCart=async(req,res)=>{
    const {prodName,Quantity}=req.body   
    const prod=await Product.findOne({prodName:req.body.prodName})
    const user=userData
    //console.log(user)
    if(!prod)
    res.status(400).json({message:'Item not found'})
    try{
        await User.findByIdAndUpdate(userData._id,{
            $addToSet:{
                cart:{
                    prodName:prod.prodName,
                    price:prod.price,
                    image:prod.image,
                    quantity:req.body.Quantity
                }
            }
            
        })
        await user.save()
        res.status(200).json({message:'Added to cart'})
    }catch(error){
        res.status(400).json({error:'Error'})
    }
}
const delCart=async(req,res)=>{
    const prodName=req.body
    const prod=await Product.findOne({prodName:req.body.prodName})
    const user=userData
        if((req.params.id)>(userData.cart[0].quantity)){
            res.status(400).json({message:'Not enough in the cart'})
        }
            var n=(userData.cart.quantity)-(req.params.id)
            if(n===0){
                //when all items from the cart are deleted 
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
            }
        }


module.exports={addCart,delCart}