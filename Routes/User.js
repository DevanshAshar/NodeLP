const express=require('express')
const {MongoClient}=require('mongodb')
const router=new express.Router()
const url='mongodb+srv://devanshAshar:devanshNode@cluster0.dedofov.mongodb.net/E-Comm.users?retryWrites=true&w=majority'
const client=new MongoClient(url)
const app=express()
require('../dbConnect')
const User=require('../Models/User')
app.use(express.json())
async function dbConnect()
{
    let result=await client.connect()
    let db=result.db('E-Comm')
    return db.collection('users')
}
router.post('/newUser',async(req,resp)=>{
    const {username, password, email, address, mobile, role}=req.body;
    if(!username || !password || !email || !address || !mobile || !role)
    return resp.status(400).json({error:"Please fill the necessary details "})
    const user=new User({username, password, email, address, mobile, role})
    user.save().then(()=>{
        resp.status(200).json({message:"Success"})
    }).catch((err)=>resp.status(500).json({error:"error"}))
})
router.get('/users',async(req,resp)=>{
    let data=await dbConnect();
    data=await data.find().toArray();
    resp.send(data)
})
router.get('/customers',async(req,resp)=>{
    let data=await dbConnect();
    data=await data.find({role:'customer'}).toArray()
    resp.send(data)
})
router.get('/sellers',async(req,resp)=>{
    let data=await dbConnect();
    data=await data.find({role:'seller'}).toArray()
    resp.send(data)
})
router.get('/:username',async(req,resp)=>{
    let data=await dbConnect();
    data=await data.find({username:req.params.username}).toArray()
    resp.send(data)
})
router.put('/',async(req,resp)=>{
    let data=await dbConnect()
    let result=await data.updateOne(
        {username:req.body.username},
        {$set:req.body}
    )
    let updatedData=await data.find({username:req.body.username}).toArray()
    resp.send(updatedData)
})
router.delete('/:username',async(req,resp)=>{
    let data=await dbConnect()
    let result=await data.deleteOne({username:req.params.username})
    resp.send(result)
})
router.use((req,res,next)=>{
    res.status(404)
    res.json({
        error:'not found'
    })
})
app.use(router)
/*app.use((req,res,next)=>{
    res.status(404)
    res.json({
        error:'not found'
    })
})*/
app.listen(3000)