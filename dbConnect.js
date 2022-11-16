const mongoose=require('mongoose')
const dotenv=require('dotenv')
// dotenv.config({path:"./config.env"})
dotenv.config()
const db=process.env.Url;
mongoose.connect(db,{
    useNewUrlParser:true,
    //useCreateIndex:true,
    useUnifiedTopology:true,
    //useFindAndModify:false
}).then(()=>{
    console.log('Connection Succesful');
}).catch((err)=>console.log('no connection'));