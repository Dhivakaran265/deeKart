import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

let user=JSON.parse(localStorage.getItem('user'));


export let cancelOrders=createAsyncThunk('order/cancelOrders',async (data,thunkAPI)=>{
          try {
            let result=await axios.delete(`http://localhost:8000/order/${data.id}`,{headers:{
              Authorization:`Bearer ${data.token}`
            }})
            localStorage.setItem('orders',JSON.stringify(result.data))
            return result.data
          } catch (error) {
              let message=error.response.data.message
              return thunkAPI.rejectWithValue(message)
          }
})
export let getOrders=createAsyncThunk('order/getOrders',async (data,thunkAPI)=>{

    try {
      let result=await axios.get('http://localhost:8000/order/',{headers:
      {Authorization:`Bearer ${data}`}})
       localStorage.setItem('order',JSON.stringify(result.data))
       return result.data

    } catch (error) {
      let message=error.response.data.message
      return thunkAPI.rejectWithValue(message)
    }
})
export let placeOrder=createAsyncThunk('order/placeOrder',async (data,thunkAPI)=>{
        try {
          console.log(data);
          let result=await axios.post('http://localhost:8000/order/',data,{headers:
          {Authorization:`Bearer ${data.token}`}})
          localStorage.setItem('order',JSON.stringify(result.data))
          return result.data
        } catch (error) {
          let message=error.response.data.message
          return thunkAPI.rejectWithValue(message)
        }
})

let orders=JSON.parse(localStorage.getItem('order'));
let orderSlice=createSlice({
  name:'order',
  initialState:{
    orderList:orders?orders:[],
    isSuccess:false,
    isRejected:false,
    isPending:false
  },
  reducers:{
    resetOrder:(state,action)=>{
      state.orderList=[]
      state.isPending=false
      state.isRejected=false
      state.isSuccess=false
    },
  },
  extraReducers:(builder)=>{
   builder.addCase(placeOrder.pending,(state,action)=>{
    state.isPending=true
   }).addCase(placeOrder.fulfilled,(state,action)=>{
     state.isPending=false
     state.isSuccess=true
     state.orderList=action.payload
     console.log(action.payload);
   }).addCase(placeOrder.rejected,(state,action)=>{
      state.isSuccess=false
      state.isPending=false
      console.log(action.payload);
  }).addCase(getOrders.pending,(state,action)=>{
    state.isPending=true
   }).addCase(getOrders.fulfilled,(state,action)=>{
     state.isPending=false
     state.isSuccess=true
     state.orderList=action.payload
     console.log(action.payload);
   }).addCase(getOrders.rejected,(state,action)=>{
      state.isSuccess=false
      state.isPending=false
      console.log(action.payload);
  }).addCase(cancelOrders.pending,(state,action)=>{
    state.isPending=true
   }).addCase(cancelOrders.fulfilled,(state,action)=>{
     state.isPending=false
     state.isSuccess=true
     state.orderList=action.payload
     console.log(action.payload);
   }).addCase(cancelOrders.rejected,(state,action)=>{
      state.isSuccess=false
      state.isPending=false
      console.log(action.payload);
  })
  }

})

export const {resetOrder}=orderSlice.actions
export default orderSlice.reducer
