const express=require('express')
const router=express.Router();
const {addCart,removeCart,getcart} =require('../controller/cartController')
const protect=require('../middleWare/authentication')

router.post('/',protect,addCart)
router.delete('/:id',protect,removeCart)
router.get('/',protect,getcart)

module.exports=router
