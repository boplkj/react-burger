import { createSlice } from '@reduxjs/toolkit'
import {ORDER_API_URL} from '../../components/utils/url'
import {  getCookie  } from "../cookie"

import {AppDispatch} from '../store'
interface IState {
  request:boolean
  success: number
  error:boolean
  errorCode: string
}

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    request: false,
    success: 0,
    error: false,
    errorCode: ''
  } as IState,
  reducers: {
    orderSuccess: (state, action) => ({
      error: false,
      errorCode: '',
      success: action.payload.order.number,
      request:false
    }),

    orderError: (state, action) => (
      {
        ...state,
        error: true,
        errorCode: action.payload,
        request: false
     }),
    request: (state) => (
      { 
        ...state,
        request: true
      })
  }
})

export const { orderSuccess, orderError, request } = orderSlice.actions

export const postOrder = (burgerIngredients:object) => async(dispatch:AppDispatch) => {

  dispatch(request())
  const res = await fetch(ORDER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie("accessToken")
  },
    body: JSON.stringify({'ingredients':burgerIngredients})
  })
     if(res.ok) {
      const dataConst = await res.json()
      dispatch(orderSuccess(dataConst))
      } else dispatch(orderError("Ошибка HTTP: " + res.status))
    try{
      postOrder(burgerIngredients);
    } catch (e) {
      dispatch(orderError('Произошла какая-то ошибка'))
    }
  }

export default orderSlice.reducer