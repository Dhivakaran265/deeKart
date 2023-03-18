const jwt=require('jsonwebtoken')
const userModel=require('../mongoose/userModel')
const asyncHandler=require('express-async-handler')

let  protect=asyncHandler( async (req,res,next)=>{

  if(!req.headers.authorization){
    throw new Error('token not found')
  }
  if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
    let token=req.headers.authorization.split(' ')[1]
    console.log(token[1]);
    let userId=jwt.verify(token,process.env.SECR_CODE)
    let user=await userModel.findById(userId.id).select('-password')
     if(!user){
      throw new Error('user not found')
     }
    console.log(user);
    req.user=user

  }
  else{
    throw new Error('Authorization Failed')
  }
next()
})

module.exports=protect