import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
import cartSlice from './Feature/cartSlice'
import userSlice from './Feature/userSlice'
import orderSlice from './Feature/orderSlice'

let store=configureStore({
  reducer:{
    cart:cartSlice,
    user:userSlice,
    order:orderSlice
  }
})
const root=createRoot(document.getElementById('root'))

root.render(
<Provider store={store}>
<App />
</Provider>


)