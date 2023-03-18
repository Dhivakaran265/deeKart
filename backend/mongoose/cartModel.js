const mongoose=require('mongoose')

let cartSchema=mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,required:true},
  product:{type:Object,required:true}

},
{timestamps:true})

let cartModel=mongoose.model('cart',cartSchema)

module.exports=cartModel