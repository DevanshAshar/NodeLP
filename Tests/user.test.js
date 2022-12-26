/*const request=require('supertest')
const jwt=require('jsonwebtoken')
const app=require('../app')
const User=require('../Models/User')
const mongoose=require('mongoose')
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
beforeEach(async()=>{
    await User.deleteMany({})
    await User(testUser1).save()
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
    .send({
        email:'ashar.devansh+123@gmail.com',
        password:'supertest123',
        role:'admin'
    }).expect(200)
})
test('get users',async()=>{
        await request(app).get('/user/users')
        .set('AuthenticateUser',`Bearer ${tkn}`)
        .expect(200)
        expect(testUser1.role).toEqual('admin')
    })
test('get customers',async()=>{
        await request(app).get('/user/customers')
        .set('AuthenticateUser',`Bearer ${tkn}`)
        .expect(200)
        expect(testUser1.role).toEqual('admin')
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
    await request(app).post('/user/profile')
    .set('AuthenticateUser',`Bearer ${tkn}`)
    .attach('image',("C:/Users/Devansh Ashar/OneDrive/Pictures/Saved Pictures/ViratKohliRCB.jpg"))
    .expect(200)
})   
test('logout',async()=>{
    await request(app).post('/user/logout')
    .set('AuthenticateUser',`Bearer ${tkn}`)
    .expect(200)
})
test('delete user',async()=>{
    await request(app).delete(`/user/${testUser1._id}`)
    .set('AuthenticateUser',`Bearer ${tkn}`)
    .expect(200)
})*/