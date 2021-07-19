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

export const getIngredients = () => (dispatch) => {
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