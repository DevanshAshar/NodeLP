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
/*async function updateDb(){
    await User.deleteMany({})
    await Product.deleteMany({})
    await User(testUser1).save()
    await User(testUser2).save()
    await Product(testProduct1).save()
}
updateDb()*/
beforeEach(async()=>{
    await User.deleteMany({})
    await Product.deleteMany({})
    await User(testUser1).save()
    await User(testUser2).save()
    await Product(testProduct1).save()
})
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
    .send(loginDetails).expect(200)
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
    .set('AuthenticateUser',`Bearer ${tkn}`)
    .expect(200)
})
test('seller prod',async()=>{
    await request(app).post('/user/sellerProd')
    .set('AuthenticateUser',`Bearer ${tkn2}`)
    .expect(200)
})
test('delete user',async()=>{
    await request(app).delete(`/user/${testUser1._id}`)
    .set('AuthenticateUser',`Bearer ${tkn}`)
    .expect(200)
})