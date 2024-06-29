import { configureStore } from '@reduxjs/toolkit'
import movieoReducer from './movieoSlice'
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    movieoData : movieoReducer,
    auth: authReducer,
  },
})