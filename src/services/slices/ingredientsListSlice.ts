import { createSlice } from '@reduxjs/toolkit'
import {INGREDIENTS_API_URL} from '../../components/utils/url'
import {AppDispatch} from '../store'

export interface IData {
  _id?:string
  name?:string
  type?:string
  proteins?:number,
  fat?:number,
  carbohydrates?:number,
  calories?:number,
  price?:number,
  image?:string
  image_mobile?:string
  image_large?:string
  __v?:number
}

interface IState{
  error: boolean,
    loadingData: IData[],
    loading : boolean,
    errorCode: string
}
const ingredientsListSlice = createSlice({
  name: 'ingridients',
  initialState: {
    error: false,
    loadingData: [],
    loading : false,
    errorCode: ''
  } as IState,
  reducers: {
    requestSucces: (state, action) => {
      return {
        ...state,
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
        ...state,
        loadingData:[],
        error: false,
        loading: true
      }
    },
  }
}) 

export const { requestSucces, requestError, request } = ingredientsListSlice.actions

export const getIngredients = () => (dispatch:AppDispatch) => {
  dispatch(request())
  fetch(INGREDIENTS_API_URL)
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .then(({ data }) => {
      dispatch(requestSucces(data))
    })
    .catch((e) => {
      dispatch(requestError("Ошибка HTTP: " + e))
    })
}

export default ingredientsListSlice.reducer