import React from "react";
import {register} from '../Feature/userSlice'
import { useDispatch,useSelector } from "react-redux";
import { useNavigate} from 'react-router-dom'

export default ()=>{
  let navigate=useNavigate()
  let dispatch=useDispatch()
  let {user,isSuccess}=useSelector(state=>state.user)

  React.useEffect(()=>{
    if(isSuccess){
      navigate('/')
      isSuccess=!isSuccess
    }
  },[isSuccess])

  let [data,setData]=React.useState(
    {name:'',
    email:'',
    password:'',
    password1:'',
    check:false})

    
  let change=(e)=>{
   
    let {name,value,checked,type}=e.target
    let val=type==='checkbox'?checked:value

    setData(prev=>{
      return{
        ...prev,
        [name]:val
      }
    })
    }

    function click(e) {
     dispatch(register(data))
     e.preventDefault()
      
    }
  return(
    
    <form onSubmit={click} className="register" >

      <div className="register-input">
      <div className='input-feild'>
      <label htmlFor="name">Enter name </label>
      <input id='name' required='required' name='name' placeholder="Enter your name" value={data.name} onChange={change} />
      </div>
      <div className='input-feild'>
      <label htmlFor="email">Enter email </label>
      <input id='email' type='email' required='required'  name='email' placeholder="Enter your email" value={data.email} onChange={change} />
      </div>
     <div className='input-feild'>
      <label htmlFor="password">Enter password</label>
      <input id='password'  required='required'  name='password' placeholder="Enter your password" value={data.password} onChange={change} />
      </div>
     <div className='input-feild'>
      <label htmlFor="password1">Confirm password</label> 
      <input id='password1'  required='required'  name='password1' placeholder="Confirm password" value={data.password1} onChange={change} />
      </div>
      <div> <input  required='required'  id='checkbox' type='checkbox' name='check' checked={data.check} onChange={change} />
      <span> Agree terms and contidtions</span></div>
      </div>
      <button className="reg-button">REGISTER</button>
    </form>
   
    
  )
}