import { createSlice } from '@reduxjs/toolkit'
import {WS_ALL_ORDERS_URL, WS_USER_ORDERS_URL } from '../../components/utils/url'
import { setCookie, getCookie, deleteCookie } from "../cookie"
const orderFeedSlice = createSlice({
  name: 'orderFeed',
  initialState: {
    total: '',
    totalToday: '',
    orders: [],
    wsConnected: false,
    wsLoading:false,
    error: false,
  },
  reducers: {
    wsOpenConnection:(state, action) =>{
      
      state.wsLoading = true
    },
    wsSuccess: ( state ) => {

      state.wsLoading = false
      state.wsConnected = true;
      state.error = false;
    },
    wsError: ( state ) => {
      state.wsConnected = false;
      state.error = true;
    },
    wsClose: ( state ) => {
      state.total= ''
      state.totalToday= ''
      state.orders= []
      state.wsConnected= false
      state.wsLoading=false
      state.error= false
    },
    wsRes: ( state, action ) => {
      const { orders, success, total, totalToday } = action.payload;
      if ( !success ) {
        state.error = true;
        return;
      };
      state.orders = orders;
      state.total = total
      state.totalToday = totalToday
    }
  },
}) 

export const {
  wsOpenConnection,
  wsSuccess,
  wsError,
  wsClose,
  wsRes,
  } = orderFeedSlice.actions





export default orderFeedSlice.reducer
