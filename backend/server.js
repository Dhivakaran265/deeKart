const express=require('express')
const app=express();
const dotenv=require('dotenv').config()
const errorHandler=require('./middleWare/errorHandler')
const connect=require('./mongoose/dbConnect')
const cors=require('cors')
const path=require('path')


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({
  origin:'http://localhost:3000'
}))

app.use('/user',require('./routes/userRoutes'))
app.use('/cart',require('./routes/cartRouter'))
app.use('/order',require('./routes/orderRoutes'))
app.use(express.static(path.join(__dirname,'..','frontend','build')))
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'..','frontend','build','index.js'))
})

app.use(errorHandler)
console.log(path.join(__dirname,'..','frontend','build'));
connect();

app.listen(process.env.PORT,()=>{
  console.log('listening '+process.env.PORT);})