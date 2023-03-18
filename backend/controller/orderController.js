const orderModel=require('../mongoose/orderModel')
const asyncHandler=require('express-async-handler')


let placeOrder=asyncHandler(async(req,res)=>{
      let product=await orderModel.create({user:req.user._id,product:req.body.product})
      let orderList=await orderModel.find()
      res.json(orderList);
})

let cancelOrder=asyncHandler(async(req,res)=>{
    console.log(req.params.id);
      let product=await orderModel.findById(req.params.id)
      
      if(product.user.toString()===req.user._id.toString()){
        if(product){
          await orderModel.deleteOne(product)
        }else{
          throw new Error('product not found');
        }
      }else{
        throw new Error('Product not order buy you')
      }
    let orderList=await orderModel.find()
    res.json(orderList)
  
})

let getOrders=asyncHandler( async(req,res)=>{
    let orderList=await orderModel.find({user:req.user._id})
    res.json(orderList)
})

module.exports={placeOrder,cancelOrder,getOrders}