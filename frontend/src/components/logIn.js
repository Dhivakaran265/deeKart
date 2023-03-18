import React from "react";
import { logIn } from "../Feature/userSlice";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default ()=>{



let [data,setData]=React.useState({email:'',password:''})
let dispatch=useDispatch()
let navigate=useNavigate()
let {isSuccess,message,isReject}=useSelector(state=>state.user)
 

let change=(e)=>{
     setData(prev=>{
      return {...prev,
      [e.target.name]:e.target.value}
     }) 
 }
React.useEffect(()=>{
  if(isSuccess){
    navigate('/')
    isSuccess=!isSuccess
  }
  if(isReject){
    alert(message)
    
  }
},[isSuccess,isReject])


 let click=(e)=>{
   dispatch(logIn(data))
   e.preventDefault() }

  return  <form onSubmit={click} className="register" >

  <div className="register-input">
 
  <div className='input-feild'>
  <label htmlFor="email">Enter email </label>
  <input id='email' type='email' required='required'  name='email' placeholder="Enter your email" value={data.email} onChange={change} />
  </div>

 <div className='input-feild'>
  <label htmlFor="password">Enter password</label>
  <input id='password'  required='required'  name='password' placeholder="Enter your password" value={data.password} onChange={change} />
  </div>

  </div>
  <button className="reg-button">LOG IN</button>
</form>



}