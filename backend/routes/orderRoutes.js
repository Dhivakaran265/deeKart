const express=require('express')
const protect=require('../middleWare/authentication')

const router=express.Router();
const {cancelOrder,placeOrder,getOrders}=require('../controller/orderController')

router.post('/',protect,placeOrder)
router.delete('/:id',protect,cancelOrder)
router.get('/',protect,getOrders)

module.exports=router
