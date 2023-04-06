import React from "react";
import { useLocation ,useParams} from "react-router-dom";
import Slider from "./slider";
import { useDispatch,useSelector} from "react-redux";
import { addCart } from "../Feature/cartSlice";
import { placeOrder } from "../Feature/orderSlice";
import data from '../data'

export default ()=>{
  let params=useParams()
  let dispatch=useDispatch()

  let user=useSelector(state=>state.user)
  let det = data.filter(val=>val.id==params.id)
  det = det[0]
 let s={
  width:'600px',
  height:'400px',
  margin:'0 auto'
 }

 let addclick=()=>{
  
  dispatch(addCart({product:det,token:user.user.token}))
 }
 let buyButton=()=>{
  if(user.user)
  dispatch(placeOrder({product:det,token:user.user.token}))
  else{
    alert('log in and make your purchase')
  }
 }
  return (
    <div>
      <div style={s}>
      {<Slider image={det.images} />}
      </div>
      <hr></hr>
      <section className="detail-card">
        <div className="title">{det.title} <b> &#183;</b> <span>{det.brand}</span></div>
        <div className="price">Price : $ {det.price}  <span>Discount : {det.discountPercentage} %</span></div>
        <p className="description">{det.description}</p>
        <div className="rating"><span className="rate"><img src='../star.png' width='20px' /> {det.rating}</span> <b>&#183;</b>  <span className="u-rating">User Ratings</span> </div>
      </section>
      <hr></hr>
     <div className="buttons">
      <button onClick={buyButton} className="buy">BUY NOW</button>
      <button onClick={addclick} className="add-cart">ADD TO CART</button>
     </div>
    </div>
  )
}