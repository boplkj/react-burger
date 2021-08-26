import { createSlice} from '@reduxjs/toolkit'
import {ORDER_API_URL} from '../../components/utils/url'
import {AppDispatch} from '../store'
interface IItem {
  createdAt: string
  ingredients: string[]
  name: string
  number: number
  owner: string
  status:string
  updatedAt: string
  __v: string
  _id: string
}
interface IState {
  order:IItem[],
  request:boolean
  success:boolean
  error:boolean
  errorCode: string
}

export const oneFeedSlice = createSlice({
  name: 'orderssf',
  initialState: {
    order: [],
    request: false,
    success: false,
    error: false,
    errorCode: ''
  }as IState,
  reducers: {
    feedSuccess: (state, action) => ({
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

export const getFeed = (feedItem:string) => (dispatch:AppDispatch) => {
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