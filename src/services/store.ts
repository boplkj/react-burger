import { combineReducers, configureStore } from '@reduxjs/toolkit'
import ingredientsListSlice from './slices/ingredientsListSlice'
import constructorListSlice  from './slices/constructorListSlice'
import orderSlice  from './slices/orderSlice'
import authSlice  from './slices/authSlice'
import orderFeedSlice  from './slices/orderFeedSlice'
import oneFeedSlice from  './slices/oneFeedSlice'
import wsMiddleware  from './middleware/wsMiddleware'


const middlewares = [
  wsMiddleware()
];

const rootReducer = combineReducers({
ingredientsList: ingredientsListSlice,
constructorList: constructorListSlice,
order: orderSlice,
auth: authSlice,
orderFeed:orderFeedSlice,
oneFeed: oneFeedSlice,
})

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(middlewares)

})

export type RootState = ReturnType<typeof rootReducer>