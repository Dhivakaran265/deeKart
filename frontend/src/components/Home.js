import React from "react";
import data from '../data'
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { getCart } from "../Feature/cartSlice";
import { placeOrder } from "../Feature/orderSlice";
import { getOrders } from "../Feature/orderSlice";

export default function Home(){
  
 let user=useSelector(state=>state.user)
 let navigate=useNavigate();
 let dispatch=useDispatch()

React.useEffect(
  ()=>{
    if(user.user){
      console.log(user);
      dispatch(getCart(user.user.token))
      dispatch(getOrders(user.user.token))
    }
  },[])

  let buyButton=(e)=>{
    if(user.user){
      console.log(e.target);
       let product = data.filter(val=>val.id===Number(e.target.id))
      dispatch(placeOrder({product:product[0],token:user.user.token}))
    }else{
      alert('login and make your purchase')
    }

     
  }

  let click=(e)=>{
    let res=data.filter(val=>val.id===Number(e.target.id))
    navigate('/details',{state:res})
  }
  const x =data.map(val=>{
    return <div className="pro-card" key={val.id}>
      <img className="pro-image" id={val.id} src={val.thumbnail} onClick={click} />
      <div className="card-details" >
      <div id={val.id} className="pro-name">{val.title} <b> &#183; </b> <span className="pro-brand">{val.brand}</span></div>
      <div id={val.id} className="price">Price : $ {val.price}  <span>Discount : {val.discountPercentage} %</span></div>
      <div id={val.id} className="rating"><span className="rate"><img src='./star.png' width='20px' /> {val.rating}</span> <b>&#183;</b>  <span className="u-rating">User Ratings</span> </div>
      </div>
    <button id={val.id} onClick={buyButton} className="buy-buttons">BUY NOW</button>
    </div>
  })  
  let nam=user.user===null?'':user.user.name;
  console.log(user);
  return(
    <div className="home-body">
      <h3>welcome {nam}</h3>
    <section className="card-container">
     {x}
  </section>  
    </div>

  )
}