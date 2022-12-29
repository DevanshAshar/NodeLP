const request=require('supertest')
const jwt=require('jsonwebtoken')
const app=require('../app')
const Product=require('../Models/Product')
const User=require('../Models/User')
const Order=require('../Models/Order')
const mongoose=require('mongoose')
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
    prodId:345,
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
/*async function updateDb(){
    console.log('testing')
    await Product.deleteMany({})
    await User.deleteMany({})
    await User(testUser1).save()
    await User(testUser2).save()
    await Product(testProduct1).save()
    await Product(testProduct2).save()
}
updateDb()*/
beforeEach(async()=>{
    await Product.deleteMany({})
    await User.deleteMany({})
    await User(testUser3).save()
    await User(testUser4).save()
    await Product(testProduct3).save()
    await Product(testProduct4).save()
})
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
    await request(app).post('/product/delCart/1')
    .set('AuthenticateUser',`Bearer ${tkn3}`)
    .send({prodName:'IPhone14'})
    .expect(200)
})
test('order',async()=>{
    await request(app).post('/product/order')
    .set('AuthenticateUser',`Bearer ${tkn3}`)
    .send({prodName:'IPhone14','Quantity':1})
    .expect(200)
})
test('delete product',async()=>{
    await request(app).delete(`/product/${testProduct3._id}`)
    .set('AuthenticateUser',`Bearer ${tkn3}`)
    .expect(200)
    expect(testUser3.role).toEqual('seller')
    expect(testProduct3.sellerEmail).toEqual(testUser3.email)
})