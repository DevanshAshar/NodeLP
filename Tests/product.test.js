const request=require('supertest')
const jwt=require('jsonwebtoken')
const app=require('../app')
const Product=require('../Models/Product')
const User=require('../Models/Product')
const Order=require('../Models/Order')
const mongoose=require('mongoose')
const testUser1={
    _id:"63a81fb78b1b129a80e29c1c",
    username:'supertestseller',
    password:'supertest123',
    email:'ashar.devansh+159@gmail.com',
    address:'supertest address',
    mobile:'7013749278',
    role:'seller',
    tokens:[{token:jwt.sign({email:'ashar.devansh+123@gmail.com'},"QWERTYUIOPASDFGHJKLZXCVBNM1234567890")}]
}
const tkn="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzaGFyLmRldmFuc2grODlAZ21haWwuY29tIiwiaWF0IjoxNjcxOTYyNTYyLCJleHAiOjE2NzIwNDg5NjJ9.jfpy0kUvfKvEbE9P-jwjVnd2wujP3OrAUyckMTKLIbE"
const testProduct1={
    _id:"63a8233968d34676286185bb",
    prodId:345,
    prodName:'IPhone14',
    brand:'Apple',
    model:'14',
    price:100000,
    category:'mobiles',
    specs:'somespecs',
    seller:'supertestseller',
    sellerEmail:'ashar.devansh+159@gmail.com'
}
/*beforeEach(async()=>{
    await Product.deleteMany({})
    await Product(testProduct1).save
    await User(testUser1).save
})*/
test('new product',async()=>{
    await request(app).post('/product/newProduct')
    .set('AuthenticateUser',`Bearer ${tkn}`)
    .send(testProduct1)
    .expect(200)
    expect(testUser1.role).toEqual('seller')
})
test('all products',async()=>{
    await request(app).get('/product/products')
    .set('AuthenticateUser',`Bearer ${tkn}`)
    .expect(200)
})
test('get sellers',async()=>{
    await request(app).get('/product/seller/supertest1')
    .expect(200)
})
test('particular product',async()=>{
    await request(app).get(`product/${testProduct1._id}`)
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
    await request(app).patch(`/product/${testProduct1._id}`)
    .set('AuthenticateUser',`Bearer ${tkn}`)
    .send({price:150000})
    .expect(200)
    expect(testUser1.role).toEqual('seller')
    expect(testProduct1.sellerEmail).toEqual(testUser1.email)
})
test('delete product',async()=>{
    await request(app).delete(`/product/${testProduct1._id}`)
    .set('AuthenticateUser',`Bearer ${tkn}`)
    .expect(200)
    expect(testUser1.role).toEqual('seller')
    expect(testProduct1.sellerEmail).toEqual(testUser1.email)
})
test('add cart',async()=>{
    await request(app).post('/product/addCart')
    .set('AuthenticateUser',`Bearer ${tkn}`)
    .send({prodName:'IPhone14','Quantity':2})
    .expect(200)
})
test('delete cart',async()=>{
    await request(app).post('/product/delCart/1')
    .set('AuthenticateUser',`Bearer ${tkn}`)
    .send({prodName:'IPhone14'})
    .expect(200)
})
test('order',async()=>{
    await request(app).post('/product/order')
    .set('AuthenticateUser',`Bearer ${tkn}`)
    .send({prodName:'IPhone14','Quantity':1})
    .expect(200)
})