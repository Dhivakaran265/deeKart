const cartModel=require('../mongoose/cartModel')
const asyncHandler= require('express-async-handler')

let addCart=asyncHandler( async (req,res)=>{
  await cartModel.create({user:req.user._id,product:req.body.product})
  let cart= await cartModel.find({user:req.user._id})
  res.json(cart)
  })

let removeCart=asyncHandler(async (req,res)=>{
  let result=await cartModel.findById(req.params.id)
  if(req.user._id.toString()!==result.user.toString()){
       throw new Error('product not created by this user')
  }
  if(result){
    await cartModel.deleteOne(result)
  }else{
    throw new Error('product not found')
  }
  let cart=await cartModel.find({user:result.user})
  res.json(cart)
})

let getcart= async (req,res)=>{
    let result =await cartModel.find({user:req.user.id});
    res.json(result)
}
module.exports={addCart,removeCart,getcart}