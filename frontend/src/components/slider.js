import React from "react";

export default ({image})=>{
  let [current,setCurrent]=React.useState(0)
  
  let s={
    backgroundImage:`url(${image[current]})`,
    width:'100%',
    height:'100%',
    backgroundPosition:'center',
  }

   let next=()=>{
   setCurrent(ps=>{
    if(ps===image.length-1){
      return 0;
    }
    else{
      return ps+1
    }
   })
  }
  let prev=()=>{
    setCurrent(ps=>{
     if(ps===0){
       return image.length-1;
     }
     else{
      console.log(ps);
       return ps-1
     }
    })
   }
   
  return (
    <div className="slider" style={s}>
    <button onClick={prev} className="prev">	<i className="fa fa-caret-left"> </i></button>
    <button onClick={next} className="next">	<i className="fa fa-caret-right"> </i></button>
    </div>
  )
}