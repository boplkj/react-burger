import { combineReducers, configureStore } from '@reduxjs/toolkit'
import ingredientsListSlice from './slices/ingredientsListSlice'
import  constructorListSlice  from './slices/constructorListSlice'
import  orderSlice  from './slices/orderSlice'


const rootReducer = combineReducers({
ingredientsList: ingredientsListSlice,
constructorList: constructorListSlice,
order: orderSlice
})

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: rootReducer
})