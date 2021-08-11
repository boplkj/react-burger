import { createSlice } from '@reduxjs/toolkit'
import q from '../../images/q.png'

export interface IItem {
  _id?: number
  id?: number
  image: string 
  name: string
  price: number
  type?: string
  index?: number
}

interface IState {
  items: IItem[]
  bun: IItem
  sum: number
}
const constructorListSlice = createSlice({
  name: 'constructorListSlice',
  initialState: {
    items: [],
    bun: {name: 'Это место зарезервировано под Булку',image: q, price:0 },
    sum: 0, 
  } as IState,reducers: {
    addIngredient: (state, action) => {
    if (action.payload.type ==='bun' && !state.bun.type) {
      state.bun = action.payload
      state.sum = state.sum + state.bun.price * 2
    }else if (action.payload.type ==='bun' && state.bun.type ) {
      state.sum = state.sum - state.bun.price * 2
      state.bun = action.payload
      state.sum = state.sum + state.bun.price * 2
    }
    
    else {
      state.items.push({ ...action.payload, _id: Math.floor(Math.random() * Math.pow(100,8)), id: action.payload._id  })
      state.sum = state.sum + action.payload.price
    }
  },
    removeIngredient: (state, action) => {
      state.sum = state.sum - action.payload.price
      state.items.splice(action.payload.index, 1)
    },
    changeIndex: (state, action) =>{
      console.log(action, 'action')
      const startIndex = action.payload.startIndex
      const endIndex = action.payload.endIndex
      const temp = state.items[startIndex]
      state.items[startIndex] = state.items[endIndex]
      state.items[endIndex] = temp
    }
  }
})


export default constructorListSlice.reducer
export const { addIngredient, removeIngredient, changeIndex } = constructorListSlice.actions