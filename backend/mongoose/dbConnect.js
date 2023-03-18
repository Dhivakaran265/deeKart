const mongoose=require('mongoose')

let connect=async()=>{
  let conn=await mongoose.connect(process.env.DB_LINK)
  console.log(conn.connection.host);
}

module.exports=connect