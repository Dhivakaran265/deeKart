const userModel=require('../mongoose/userModel')
const asyncHandler=require('express-async-handler')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

  let register=asyncHandler(async (req,res)=>{  
       if(req.body.name&&req.body.email&&req.body.password){
         
         let check=await userModel.find({email:req.body.email})
   
         if(check[0]){
          throw new Error('User altready registered')
         }
         let salt=await bcrypt.genSalt(10)
         let hash=await bcrypt.hash(req.body.password,salt)
         let credentials={name:req.body.name,email:req.body.email,password:hash};
         let result=await userModel.create(credentials);
         let token=jwt.sign({id:result._id},process.env.SECR_CODE,{expiresIn:'10days'})
         res.json({id:result._id,name:credentials.name,email:credentials.email,token});
       }
       else{
        throw new Error('Fill all the all fields')
       }
        })

  let logIn=asyncHandler(async (req,res)=>{
    if(req.body.email&&req.body.password){
      let check=await userModel.find({email:req.body.email})
      if(check[0]&&await bcrypt.compare(req.body.password,check[0].password)){
          let token=jwt.sign({id:check[0]._id},process.env.SECR_CODE,{expiresIn:'10d'})
          res.json({
            id:check[0]._id,
            name:check[0].name,
            email:check[0].email,
            token:token
          })
        }else{
        throw new Error('User not registered or invalid credentials')
      }
    }
    else{
      throw new Error('Enter valid credentials')
    }
  })

  let getUsers=asyncHandler( async (req,res)=>{
    res.json({name:'get'})
  })

  module.exports={register,logIn,getUsers}