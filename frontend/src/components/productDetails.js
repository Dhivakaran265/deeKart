import React from "react";
import { useLocation } from "react-router-dom";
import Slider from "./slider";
import { useDispatch,useSelector} from "react-redux";
import { addCart } from "../Feature/cartSlice";
import { placeOrder } from "../Feature/orderSlice";

export default ()=>{
  
  let dispatch=useDispatch()
  let location=useLocation();
  let user=useSelector(state=>state.user)
  let details=location.state[0]
  let images=location.state[0].images;
  
 let s={
  width:'600px',
  height:'400px',
  margin:'0 auto'
 }

 let addclick=()=>{
  
  dispatch(addCart({product:details,token:user.user.token}))
 }
 let buyButton=()=>{
  if(user.user)
  dispatch(placeOrder({product:details,token:user.user.token}))
  else{
    alert('log in and make your purchase')
  }
 }
  return (
    <div>
      <div style={s}>
      {<Slider image={images} />}
      </div>
      <hr></hr>
      <section className="detail-card">
        <div className="title">{details.title} <b> &#183;</b> <span>{details.brand}</span></div>
        <div className="price">Price : $ {details.price}  <span>Discount : {details.discountPercentage} %</span></div>
        <p className="description">{details.description}</p>
        <div className="rating"><span className="rate"><img src='./star.png' width='20px' /> {details.rating}</span> <b>&#183;</b>  <span className="u-rating">User Ratings</span> </div>
      </section>
      <hr></hr>
     <div className="buttons">
      <button onClick={buyButton} className="buy">BUY NOW</button>
      <button onClick={addclick} className="add-cart">ADD TO CART</button>
     </div>
    </div>
  )
}