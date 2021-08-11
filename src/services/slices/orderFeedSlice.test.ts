import reducer, {wsOpenConnection, wsSuccess, wsError, wsClose, wsRes} from './orderFeedSlice'

const initialState ={
total: '',
totalToday: '',
orders: [],
wsConnected: false,
wsLoading:false,
error: false,
}

describe('orderFeed', () => {
  it("Должен вернуть initialState - orderFeedSlice", () =>{
  expect(reducer(undefined, {})).toEqual(
    initialState
  )
})
it("wsOpenConnection", () => {
  const reduce = reducer(initialState, wsOpenConnection());
  const result = { 
    ...initialState,
    wsLoading: true 
  };
  expect(reduce).toEqual(result);
});


it("wsSuccess", () => {
  const reduce = reducer(initialState, wsSuccess());
  const result = { 
    ...initialState,
    error: false,
    wsLoading: false,
    wsConnected: true
  };
  expect(reduce).toEqual(result);
});

it("wsError", () => {
  const reduce = reducer(initialState, wsError());
  const result = { 
    ...initialState,
    error: true,
    wsConnected: false
  };
  expect(reduce).toEqual(result);
});

it("wsClose", () => {
  const reduce = reducer(initialState, wsClose());
  const result = { 
    ...initialState,
  };
  expect(reduce).toEqual(result);
});

it("wsRes suc", () => {
  const payload = {orders:[{name:'name'}], success:true, total:123, totalToday:1233}
  const reduce = reducer(initialState, wsRes(payload));
  const result = { 
    ...initialState,
    orders : payload.orders,
    total : payload.total,
    totalToday: payload.totalToday,
  };
  expect(reduce).toEqual(result);
});

it("wsRes Unsuc", () => {
  const payload = {orders:[{name:'name'}], success:false, total:123, totalToday:1233}
  const reduce = reducer(initialState, wsRes(payload));
  const result = { 
    ...initialState,
    error:true,

  };
  expect(reduce).toEqual(result);
});

  
})
