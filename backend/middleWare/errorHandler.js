
let errorHandler=(error,req,res,next)=>{
    
  res.status(400).json({message:error.message,stack:error.stack})

}

module.exports=errorHandler