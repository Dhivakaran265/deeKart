const express=require('express')
const {getUsers,logIn,register}=require('../controller/userController')
let router=express.Router()

router.post('/register',register)
router.post('/login',logIn)
router.get('/getUsers',getUsers)

module.exports=router