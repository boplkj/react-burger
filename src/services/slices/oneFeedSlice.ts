import { createSlice, Dispatch } from '@reduxjs/toolkit'
import {ORDER_API_URL} from '../../components/utils/url'

export const oneFeedSlice = createSlice({
  name: 'orderssf',
  initialState: {
    order: [],
    request: false,
    success: false,
    error: false,
    errorCode: ''
  },
  reducers: {
    feedSuccess: (state, action) => ( {
      ...state,
      error: false,
      errorCode: '',
      order: action.payload,
      request:false
    }),

    feedError: (state, action) => (
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

export const { feedSuccess, feedError, request } = oneFeedSlice.actions

export const getFeed = (feedItem:string) => (dispatch:Dispatch) => {
  dispatch(request())
  fetch(ORDER_API_URL+'/'+feedItem)
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .then(( res ) => {
      console.log(res, 'data?')
      dispatch(feedSuccess(res.orders))
    })
    .catch((e) => {
      dispatch(feedError("Ошибка HTTP: " + e))
    })
}

export default oneFeedSlice.reducer