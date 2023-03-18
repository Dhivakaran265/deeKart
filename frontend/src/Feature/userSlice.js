import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export let register=createAsyncThunk('user/register',async (data,thunkAPI)=>{
      try {
        console.log(data);
        let user=await axios.post('http://localhost:8000/user/register',data);
        localStorage.setItem('user',JSON.stringify(user.data))
        return user.data;

      } catch (error) {
        let message=error.response.data.message
        return thunkAPI.rejectWithValue(message)
      }    
})

export let logIn=createAsyncThunk('user/logIn',async (data,thunkAPI)=>{
   try {
    let user=await axios.post('http://localhost:8000/user/login',data)
    localStorage.setItem('user',JSON.stringify(user.data) )
    return user.data;
   } catch (error) {
    let message=error.response.data.message
    return thunkAPI.rejectWithValue(message)

   }
})
let user=JSON.parse(localStorage.getItem('user'));
const userSlice=createSlice({
  name:'user',
  initialState:{
    user:user?user:null,
    isSuccess:false,
    isLoading:false,
    isReject:false,
    message:''
  },
  reducers:{
    reset:(state,action)=>{
      state.user=null
      state.isLoading=false
      state.isSuccess=false
      state.isReject=false
      state.message=''
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(register.pending,(state,action)=>{
        state.isLoading=true
        }).addCase(register.fulfilled,(state,action)=>{
          state.isLoading=false
          state.isSuccess=true
          state.user=action.payload
          console.log(action.payload);
        }).addCase(register.rejected,(state,action)=>{
          state.isReject=true
          console.log(action.payload);
        }).addCase(logIn.pending,(state,action)=>{
          state.isReject=false
          state.isLoading=true
          }).addCase(logIn.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.user=action.payload
            console.log(action.payload);
          }).addCase(logIn.rejected,(state,action)=>{
            state.isReject=true
            state.message=action.payload
            console.log(action.payload);
          })

  }
})
export const {reset}=userSlice.actions
export default userSlice.reducer