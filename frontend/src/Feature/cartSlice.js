import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

let user=JSON.parse(localStorage.getItem('user'));
let cart=JSON.parse(localStorage.getItem('cart'));

export let addCart=createAsyncThunk('cart/addCart',async (data,thunkAPI)=>{
  try {
    let result=await axios.post('http://localhost:8000/cart/',data,{headers:{
      Authorization:`Bearer ${data.token}`
    }})
    localStorage.setItem('cart',JSON.stringify(result.data))
    return result.data
  } catch (error) {
    let message=error.response.data.message
    return thunkAPI.rejectWithValue(message)
  } 
 
  })

  export let removeCart=createAsyncThunk('cart/removeCart',async (data,thunkAPI)=>{
        try {
          let result=await axios.delete(`http://localhost:8000/cart/${data.id}`,{headers:{
            Authorization:`Bearer ${data.token}`
          }})
          localStorage.setItem('cart',JSON.stringify(result.data))
          console.log(result.data);
          return result.data
        } catch (error) {
         let message=error.response.data.message
         return thunkAPI.rejectWithValue(message)
        }
  })

  export let getCart=createAsyncThunk('cart/getCart',async (data,thunkAPI)=>{
   try {
    let cartItems=await axios.get('http://localhost:8000/cart/',{headers:{
      Authorization:`Bearer ${data}`
    }})
    return cartItems.data
   } catch (error) {
    let message=error.response.data.message
    return thunkAPI.rejectWithValue(message)
    
   }
 
  })
let cartSlice=createSlice({
  name:'cart',
  initialState:{
    cart:cart?cart:[],
    isSuccess:false,
    isRejected:false,
    isLoading:false
  },
  reducers:{
      resetCart:(state,action)=>{
        state.cart=[]
        state.isLoading=false
        state.isSuccess=false
        state.isRejected=false
      }
  },
  
  extraReducers:(builder)=>{
    builder.addCase(addCart.pending,(state,action)=>{
          state.isLoading=true
    }).addCase(addCart.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess=true
        state.cart=action.payload
    }).addCase(addCart.rejected,(state,action)=>{
     console.log(action.payload);
    })
    .addCase(removeCart.pending,(state,action)=>{
      state.isLoading=true
}).addCase(removeCart.fulfilled,(state,action)=>{
    state.isLoading=false
    state.isSuccess=true
    state.cart=action.payload
}).addCase(removeCart.rejected,(state,action)=>{
  console.log(action.payload);
})    .addCase(getCart.pending,(state,action)=>{
  state.isLoading=true
}).addCase(getCart.fulfilled,(state,action)=>{
state.isLoading=false
state.isSuccess=true
state.cart=action.payload
console.log(action.payload);
}).addCase(getCart.rejected,(state,action)=>{
console.log(action.payload);
})


  }
})


export const {resetCart} =cartSlice.actions
export default cartSlice.reducer