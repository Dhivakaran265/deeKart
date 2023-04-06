import React from "react";
import data from '../data'
import { useParams,useNavigate } from "react-router-dom";

export default function Search(){
  let navigate=useNavigate()
  let {product}=useParams();
 
  let details=(e)=>{
      navigate(`/details/${e.target.id}`)
  }
  let res=data.filter(val=> val.title.toLowerCase().includes(product.toLowerCase())|| val.category.toLowerCase().includes(product.toLowerCase())||val.brand.toLowerCase().includes(product.toLowerCase()))

  const x =res.map(val=>{
    return <div className="pro-card" key={val.id}>
      <img className="pro-image" id={val.id} src={val.thumbnail} onClick={details}/>
      <div className="card-details" >
      <div id={val.id} className="pro-name">{val.title} <b> &#183; </b> <span className="pro-brand">{val.brand}</span></div>
      <div id={val.id} className="price">Price : $ {val.price}  <span>Discount : {val.discountPercentage} %</span></div>
      <div id={val.id} className="rating"><span className="rate"><img src='../star.png' width='20px' /> {val.rating}</span> <b>&#183;</b>  <span className="u-rating">User Ratings</span> </div>
      </div>
      <br></br>
      <hr></hr>
    </div>
  })  
  return (
    <div style={{marginTop:'80px'}}>
      {x}
    </div>
  )
}