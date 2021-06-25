import { createSlice } from '@reduxjs/toolkit'
import {INGREDIENTS_API_URL} from '../../components/utils/url'

const ingredientsListSlice = createSlice({
  name: 'ingridients',
  initialState: {
    error: false,
    loadingData: [],
    loading : false,
    errorCode: ''
  },
  reducers: {
    requestSucces: (state, action) => {
      return {
        loadingData: action.payload,
        error: false,
        loading: false
      }
    },
    requestError: (state, action) => {
      return {
        loadingData: [],
        error: true,
        loading: false,
        errorCode: action.payload
      }
    },
    request: (state) => {
      return {
        loadingData:[],
        error: false,
        loading: true
      }
    },
  }
}) 

export const { requestSucces, requestError, request } = ingredientsListSlice.actions

export const getIngridients = () => async(dispatch) => {
  dispatch(request())
   const res = await fetch(INGREDIENTS_API_URL)
    if(res.ok){
      const dataConst = await res.json()
      dispatch(requestSucces(dataConst.data))
    } else {
      dispatch(requestError("Ошибка HTTP: " + res.status))
    }
    try{
      getIngridients();
    } catch (e) {
      dispatch(requestError())
    }
}

export default ingredientsListSlice.reducer