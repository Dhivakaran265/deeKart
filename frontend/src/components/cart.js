import React from "react";
import {useDispatch,useSelector} from 'react-redux'
import { removeCart } from "../Feature/cartSlice";
import { placeOrder } from "../Feature/orderSlice";
import {nanoid} from 'nanoid'



export default function Cart(){
  let userSelector=useSelector(state=>state.user)

  let cartSelector=useSelector(state=>state.cart.cart)
  let dispatch=useDispatch()


 

   let remove=(e)=>{
     dispatch(removeCart({id:e.target.id,token:userSelector.user.token}))
   }

   let buy=(e)=>{
    if(userSelector.user){
      let item=cartSelector.filter(val=>val._id===e.target.id)
      dispatch(placeOrder({product:item[0].product,token:userSelector.user.token}))
      dispatch(removeCart(e.target.id))
    }else{
      alert('log in and make your purchase')
    }

      }


  let x=cartSelector.length===0?'Nothing in your cart':cartSelector.map(value=>{
    let id=value._id
    let val=value.product
    return(
      <div className="cart-card" key={nanoid()}>
         <img id={id} className='cart-pic' src={val.thumbnail} />
         <div className="cart-details">
         <div id={id} className="pro-name">{val.title} <b> &#183; </b> <span className="pro-brand">{val.brand}</span></div>
      <div id={id} className="price">Price : $ {val.price}  <span>Discount : {val.discountPercentage} %</span></div>
      <div id={id} className="rating"><span className="rate"><img src='./star.png' width='20px' /> {val.rating}</span> <b>&#183;</b>  <span className="u-rating">User Ratings</span> </div>
      <div className="cart-buttons">
          <button className="buy-btn" id={id} onClick={buy}>BUY NOW</button>
          <button className="remove" id={id} onClick={remove} >REMOVE FROM CART</button>
         </div>
         </div>
      </div>
    )
  })

  return(
    <div style={{marginTop:'50px'}}>
      {x}
    </div>
  )
}