const request=require('supertest')
const jwt=require('jsonwebtoken')
const app=require('../app')
const User=require('../Models/User')
const Product=require('../Models/Product')
const mongoose=require('mongoose')
const dbConnect=require('../dbConnect')
const testUser1={
        _id:new mongoose.Types.ObjectId(),
        username:'supertest1',
        password:'supertest123',
        email:'ashar.devansh+123@gmail.com',
        address:'supertest address',
        mobile:'9083749278',
        role:'admin',
        tokens:[{token:jwt.sign({email:'ashar.devansh+123@gmail.com'},"QWERTYUIOPASDFGHJKLZXCVBNM1234567890")}]
}
const tkn=testUser1.tokens[0].token
const testUser2={
    _id:new mongoose.Types.ObjectId(),
    username:'supertest2',
    password:'supertest223',
    email:'ashar.devansh+223@gmail.com',
    address:'supertest address',
    mobile:'9283749278',
    role:'seller',
    tokens:[{token:jwt.sign({email:'ashar.devansh+223@gmail.com'},"QWERTYUIOPASDFGHJKLZXCVBNM1234567890")}]
}
const tkn2=testUser2.tokens[0].token
const testUser5={
    _id:new mongoose.Types.ObjectId(),
    username:'supertest5',
    password:'supertest523',
    email:'ashar.devansh+523@gmail.com',
    address:'supertest address',
    mobile:'9283749275',
    role:'seller',
    tokens:[{token:jwt.sign({email:'ashar.devansh+523@gmail.com'},"QWERTYUIOPASDFGHJKLZXCVBNM1234567890")}]
}
const tkn5=testUser5.tokens[0].token
const testProduct1={
    _id:new mongoose.Types.ObjectId(),
    prodId:345,
    prodName:'IPhone14',
    brand:'Apple',
    model:'14',
    price:100000,
    category:'mobiles',
    specs:'somespecs',
    seller:'supertestseller',
    sellerEmail:'ashar.devansh+223@gmail.com',
    quantity:100000
}
const loginDetails={
    email:'ashar.devansh+223@gmail.com',
    password:'supertest223',
    role:'seller'
}
async function updateDb(){
    await User.deleteMany({})
    await Product.deleteMany({})
    await User(testUser1).save()
    await User(testUser2).save()
    await User(testUser5).save()
    await Product(testProduct1).save()
}
//updateDb()
async function timing(){
await updateDb()
}
timing()
test('signup test',async()=>{
    await request(app).post('/user/newUser')
    .send({
        username:'harcodetest1',
        password:'supertest123',
        email:'try.user99+1213@gmail.com',
        address:'supertest address',
        mobile:'8083749018',
        role:'admin'
    }).expect(200)
})
test('login test',async()=>{
    await request(app).post('/user/userLogin')
    .send({
        email:'try.user99+1213@gmail.com',
        password:'supertest123',
        role:'admin'
    }).expect(200)
})
test('get users',async()=>{
        await request(app).get('/user/users')
        .set('AuthenticateUser',`Bearer ${tkn}`)
        .expect(200)
    })
test('get customers',async()=>{
        await request(app).get('/user/customers')
        .set('AuthenticateUser',`Bearer ${tkn}`)
        .expect(200)
    })
test('get sellers',async()=>{
        await request(app).get('/user/sellers')
        .set('AuthenticateUser',`Bearer ${tkn}`)
        .expect(200)
        expect(testUser1.role).toEqual('admin')
    })
test('get particular user',async()=>{
        await request(app).get(`/user/${testUser1._id}`)
        .set('AuthenticateUser',`Bearer ${tkn}`)
        .expect(200)
        expect(testUser1.tokens[0].token).toEqual(tkn)
    })
test('update user',async()=>{
    await request(app).patch(`/user/${testUser1._id}`)
    .set('AuthenticateUser',`Bearer ${tkn}`)
    .send({mobile:7820913487})
    .expect(200)
})
test('profile pic',async()=>{
    jest.setTimeout(50000)
    await request(app).post('/user/profile')
    .set('AuthenticateUser',`Bearer ${tkn}`)
    .attach('profile',("C:/Users/Devansh Ashar/OneDrive/Pictures/Saved Pictures/ViratKohliRCB.jpg"))
    .expect(200)
})   
test('logout',async()=>{
    await request(app).post('/user/logout')
    .set('AuthenticateUser',`Bearer ${tkn2}`)
    .expect(200)
})
test('logoutAll',async()=>{
    await request(app).post('/user/logoutAll')
    .set('AuthenticateUser',`Bearer ${tkn5}`)
    .expect(200)
})
test('seller prod',async()=>{
    await request(app).post('/user/sellerProd')
    .set('AuthenticateUser',`Bearer ${tkn2}`)
    .expect(200)
})
test('new product',async()=>{
    const res=await request(app).post('/product/newProduct')
    .set('AuthenticateUser',`Bearer ${tkn}`)
    .send(testProduct1)
    .expect(401)
})
test('delete user',async()=>{
    await request(app).delete(`/user/${testUser1._id}`)
    .set('AuthenticateUser',`Bearer ${tkn}`)
    .expect(200)
})
test('user not found login test',async()=>{
    await request(app).post('/user/userLogin')
    .send({
        email:'ashar.devansh+123@gmail.com',
        password:'supertest123',
        role:'admin'
    }).expect(400)
})

const testUser3={
    _id:new mongoose.Types.ObjectId(),
    username:'supertestseller',
    password:'supertest123',
    email:'ashar.devansh+149@gmail.com',
    address:'supertest address',
    mobile:'7013749278',
    role:'seller',
    tokens:[{token:jwt.sign({email:'ashar.devansh+149@gmail.com'},"QWERTYUIOPASDFGHJKLZXCVBNM1234567890")}]
}
const testUser4={
    _id:new mongoose.Types.ObjectId(),
    username:'supertestseller1',
    password:'supertest123',
    email:'ashar.devansh+1491@gmail.com',
    address:'supertest address',
    mobile:'7113749278',
    role:'seller',
    tokens:[{token:jwt.sign({email:'ashar.devansh+1491@gmail.com'},"QWERTYUIOPASDFGHJKLZXCVBNM1234567890")}]
}
const tkn4=testUser4.tokens[0].token
const tkn3=testUser3.tokens[0].token
const testProduct3={
    _id:new mongoose.Types.ObjectId(),
    prodId:346,
    prodName:'IPhone14',
    brand:'Apple',
    model:'14',
    price:100000,
    category:'mobiles',
    specs:'somespecs',
    seller:'supertestseller',
    sellerEmail:'ashar.devansh+149@gmail.com',
    quantity:100000
}
const testProduct4={
    _id:new mongoose.Types.ObjectId(),
    prodId:350,
    prodName:'IPhone13',
    brand:'Apple',
    model:'13',
    price:90000,
    category:'mobiles',
    specs:'somespecs',
    seller:'supertestseller',
    sellerEmail:'ashar.devansh+149@gmail.com',
    quantity:100000
}
const testProduct5={
        prodId:348,
        prodName:'IPhone14+',
        brand:'Apple',
        model:'14+',
        price:200000,
        category:'mobiles',
        specs:'somespecs',
        seller:'supertestseller',
        sellerEmail:'ashar.devansh+149@gmail.com',
        quantity:100000
}
const testProduct6={
    prodId:34,
    prodName:'IPhone',
    brand:'Apple',
    model:'1',
    price:200000,
    category:'mobiles',
    specs:'somespecs',
    seller:'supertestseller',
    sellerEmail:'ashar.devansh+149@gmail.com',
    quantity:1
}
async function updateDb2(){
    await User.deleteMany({})
    await Product.deleteMany({})
    await User(testUser3).save()
    await User(testUser4).save()
    await Product(testProduct3).save()
    await Product(testProduct4).save()
    await Product(testProduct6).save()
}
//updateDb2()
async function timing2(){
await updateDb2()
}
timing2()
test('new product',async()=>{
    const res=await request(app).post('/product/newProduct')
    .set('AuthenticateUser',`Bearer ${tkn3}`)
    .send(testProduct5)
    .expect(200)
    expect(testUser3.role).toEqual('seller')
})
test('all products',async()=>{
    await request(app).get('/product/products')
    .set('AuthenticateUser',`Bearer ${tkn3}`)
    .expect(200)
})
test('get sellers',async()=>{
    await request(app).get('/product/seller/supertest1')
    .expect(200)
})
test('particular product',async()=>{
    await request(app).get(`/product/${testProduct3._id}`)
    .expect(200)
})
test('get categories',async()=>{
    await request(app).get('/product/category/mobiles')
    .expect(200)
})
test('get brands',async()=>{
    await request(app).get('/product/brand/Apple')
    .expect(200)
})
test('update product',async()=>{
    await request(app).patch(`/product/${testProduct3._id}`)
    .set('AuthenticateUser',`Bearer ${tkn3}`)
    .send({price:150000})
    .expect(200)
    expect(testUser3.role).toEqual('seller')
    expect(testProduct3.sellerEmail).toEqual(testUser3.email)
})
test('prodImage',async()=>{
    await request(app).post(`/product/images/${testProduct3._id}`)
    .set('AuthenticateUser',`Bearer ${tkn3}`)
    .attach('product',("C:/Users/Devansh Ashar/OneDrive/Pictures/Saved Pictures/ViratKohliRCB.jpg"))
    .expect(200)
})
test('compareProd',async()=>{
    await request(app).post('/product/compare')
    .set('AuthenticateUser',`Bearer ${tkn3}`)
    .send({product1:testProduct3._id,product2:testProduct4._id})
    .expect(200)
})
test('add cart',async()=>{
    await request(app).post('/product/addCart')
    .set('AuthenticateUser',`Bearer ${tkn3}`)
    .send({prodName:'IPhone14','Quantity':2})
    .expect(200)
})
test('delete cart',async()=>{
    await request(app).post('/product/delCart')
    .set('AuthenticateUser',`Bearer ${tkn3}`)
    .send({prodName:'IPhone14'})
    .expect(200)
})
test('direct order',async()=>{
    await request(app).post('/product/directOrder')
    .set('AuthenticateUser',`Bearer ${tkn3}`)
    .send({prodName:'IPhone14','Quantity':1})
    .expect(200)
})
test('empty cart order',async()=>{
    await request(app).post('/product/cartOrder')
    .set('AuthenticateUser',`Bearer ${tkn3}`)
    .expect(200)
})
test('add cart for Order',async()=>{
    await request(app).post('/product/addCart')
    .set('AuthenticateUser',`Bearer ${tkn3}`)
    .send({prodName:'IPhone14','Quantity':2})
    .expect(200)
})
test('cart order',async()=>{
    await request(app).post('/product/cartOrder')
    .set('AuthenticateUser',`Bearer ${tkn3}`)
    .expect(200)
})
test('delete product',async()=>{
    await request(app).delete(`/product/${testProduct3._id}`)
    .set('AuthenticateUser',`Bearer ${tkn3}`)
    .expect(200)
    expect(testUser3.role).toEqual('seller')
    expect(testProduct3.sellerEmail).toEqual(testUser3.email)
})

test('no route found',async()=>{
    await request(app).get('/users/users')
    .expect(404)
})
test('invalid user email',async()=>{
    await request(app).post('/user/newUser')
    .send({
        username:'harcodetest2',
        password:'supertest123',
        email:'invalid',
        address:'supertest address',
        mobile:'8283749018',
        role:'admin'
    }).expect(500)
})
test('no token',async()=>{
    await request(app).get('/user/users')
    .expect(401) 
})
test('token but no user',async()=>{
    await request(app).get('/user/users')
    .set('AuthenticateUser',`Bearer eanvkdvdjknlvkdinvalidtoken`)  
    .expect(400)
})
test('token not starting with bearer',async()=>{
    await request(app).get('/user/users')
    .set('AuthenticateUser',`eanvkdvdjknlvkdinvalidtoken`)  
    .expect(400)
})
test('invalid user test',async()=>{
    await request(app).get(`/user/${testUser3._id}`)
    .set('AuthenticateUser',`Bearer ${tkn4}`)
    .expect(401)
})
test('invalid seller test',async()=>{
    await request(app).patch(`/product/${testProduct4._id}`)
    .set('AuthenticateUser',`Bearer ${tkn4}`)
    .send({price:150000})
    .expect(401)
})
test('invalid update Prod test',async()=>{
    await request(app).patch(`/product/${testProduct3._id}`)
    .set('AuthenticateUser',`Bearer ${tkn3}`)
    .send({price:150000})
    .expect(404)
})
test('invalid admin',async()=>{
    await request(app).get('/user/users')
    .set('AuthenticateUser',`Bearer ${tkn3}`)
    .expect(401)
})
test('incomplete user details',async()=>{
    await request(app).post('/user/newUser')
    .send({
        username:'harcodetest1',
        password:'supertest123',
        email:'try.user99+1213@gmail.com',
        address:'supertest address',
        role:'admin'
    }).expect(400)
})
test('incomplete login details',async()=>{
    await request(app).post('/user/userLogin')
    .send({
        email:'try.user99+1213@gmail.com',
        password:'supertest123',
    }).expect(400)
})
test('user not found',async()=>{
    await request(app).post('/user/userLogin')
    .send({
        email:'try.user99+1213@gmail.com',
        password:'supertest123',
        role:'customer'
    }).expect(400)
})
test('invalid credentials',async()=>{
    await request(app).post('/user/userLogin')
    .send({
        email:'ashar.devansh+149@gmail.com',
        password:'wrongpass',
        role:'seller'
    }).expect(400)
})
test('add cart for sold out test',async()=>{
    await request(app).post('/product/addCart')
    .set('AuthenticateUser',`Bearer ${tkn4}`)
    .send({prodName:'IPhone','Quantity':2})
    .expect(200)
})
test('sold out test cart',async()=>{
    await request(app).post('/product/cartOrder')
    .set('AuthenticateUser',`Bearer ${tkn4}`)
    .expect(400)
})
test('direct order',async()=>{
    await request(app).post('/product/directOrder')
    .set('AuthenticateUser',`Bearer ${tkn3}`)
    .send({prodName:'IPhone','Quantity':2})
    .expect(200)
})
test('incomplete prod details',async()=>{
    const res=await request(app).post('/product/newProduct')
    .set('AuthenticateUser',`Bearer ${tkn3}`)
    .send({
        prodId:38,
        prodName:'IPhone14+',
        brand:'Apple',
        model:'14+',
        price:200000,
        category:'mobiles',
        specs:'somespecs',
        seller:'supertestseller',
        sellerEmail:'ashar.devansh+149@gmail.com'
})
    .expect(400)
    expect(testUser3.role).toEqual('seller')
})
test('incomplete prod details',async()=>{
    const res=await request(app).post('/product/newProduct')
    .set('AuthenticateUser',`Bearer ${tkn3}`)
    .send({
        prodId:3,
        prodName:'IPhone14+',
        brand:'Apple',
        model:'14+',
        price:200000,
        category:'mobiles',
        specs:'somespecs',
        seller:'supertestseller',
        sellerEmail:'ashar.devansh+1@gmail.com'
})
    .expect(400)
    expect(testUser3.role).toEqual('seller')
})
test('incomplete prod details',async()=>{
    const res=await request(app).post('/product/newProduct')
    .set('AuthenticateUser',`Bearer ${tkn3}`)
    .send({
        prodId:3,
        prodName:'IPhone14+',
        brand:'Apple',
        model:'14+',
        price:200000,
        category:'mobiles',
        specs:'somespecs',
        seller:'supertestseller',
        sellerEmail:'ashar.devansh+1@gmail.com',
        quantity:5
})
    .expect(400)
    expect(testUser3.role).toEqual('seller')
})
test('invalid particular product',async()=>{
    await request(app).get(`/product/wrongId`)
    .expect(500)
})
test('add invalid cart',async()=>{
    await request(app).post('/product/addCart')
    .set('AuthenticateUser',`Bearer ${tkn3}`)
    .send({prodName:'vivo','Quantity':2})
    .expect(400)
})
