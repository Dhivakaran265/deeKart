const mongoose=require('mongoose')

let orderSchema=mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,required:true},
  product:{type:Object,required:true}
},{
  timestamps:true
})

let orderModel=mongoose.model('order',orderSchema)

module.exports=orderModel