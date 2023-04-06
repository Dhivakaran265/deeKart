import React from "react";
import Home from './Home'
import {BrowserRouter,Route,Routes,Link,useNavigate} from 'react-router-dom'
import Register from "./register";
import LogIn from "./logIn";
import ProductDetails from "./productDetails";
import Cart from "./cart";
import { useSelector } from "react-redux";
import { reset } from "../Feature/userSlice";
import { useDispatch } from "react-redux";
import { resetCart } from "../Feature/cartSlice";
import Orders from '../components/orders'
import {resetOrder} from '../Feature/orderSlice'

export default function Navigator(){
  let user=useSelector(state=>state.user) 
  let cart=useSelector(state=>state.cart)
  let order=useSelector(state=>state.order)
  
  let dispatch=useDispatch()

  let logout=(e)=>{
       localStorage.removeItem('user')
       localStorage.removeItem('cart')
       localStorage.removeItem('order')
       dispatch(resetCart())
       dispatch(reset())
       dispatch(resetOrder())
       window.location.reload(false)
  }
  return(
    <div>
      <BrowserRouter>
      <div className="navigate">
         <section className="app-title"> <Link className="mart" to='/'>DeeKart</Link>
         </section>
        <div className="signIn">

         <section className="navi" >  <Link className="mart" to='/cart'>Cart</Link>
         <div className="cnt-tag">
         <i className="fa fa-shopping-cart" />
         <p>{cart.cart.length}</p>
         </div>
         </section>
         <section className="navi">
          <Link to='/order' className="mart">Orders</Link>
          <div className="cnt-tag">
          <i className="fa fa-shopping-bag" />
          <p>{order.orderList.length}</p>
          </div>
          
         </section>
         <section className="navi">
        <Link className="mart" to='/register'>Register</Link>
        <i className="fa fa-user-plus" />
         </section>
        
         <section style={{minWidth:'100px'}}>
         {user.user?<button className="log-button" onClick={logout}>Log Out</button>:
          <Link className="mart" to='login'>LogIn</Link>}
         </section>
      
       
        </div>
        
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/details/:id' element={<ProductDetails />} />
        <Route path="/order" element={<Orders />} />
      </Routes>



      </BrowserRouter>
    </div>
  )
}