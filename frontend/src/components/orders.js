import { useSelector } from "react-redux";
import React from "react";
import { cancelOrders } from "../Feature/orderSlice";
import { useDispatch } from "react-redux";


export default function OrderSlice(){
  let user=useSelector(state=>state.user)
  let dispatch=useDispatch()
  let orderList=useSelector(state=>state.order.orderList)
  console.log(orderList);
   
  let cancelOrder=(e)=>{
    console.log(e.target.id);
     dispatch(cancelOrders({id:e.target.id,token:user.user.token}))
  }
  let x
  if(orderList.length==0){
    x='Nothing you ordered'
  }else{
   x=orderList.map(val=>{
    return(
      <>
      <div key={val._id} className='order-items' >
        <div className="order-details">
          <div className="det-stats">
          <p>product name:<b>{val.product.title}</b> </p>
          <p>Order placed at :<b>{new Date(val.createdAt).toLocaleString('en-US') }</b></p>
          <p>Order will deliver in 4 Days</p>
          </div>
       
       <div className="order-btn">
         <button id={val._id} onClick={cancelOrder} >CANCEL NOW</button>
         <button>Need Help?</button>
       </div>
        </div>

        <img className="order-thumbnail" src={val.product.thumbnail} />
      </div>
      <hr></hr>
      </>
    )
  })}
  console.log(x);
  return(
    <div className="order-container">
      {x}
    </div>
  )
}