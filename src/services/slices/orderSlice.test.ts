import reducer, {orderSuccess, orderError, request} from './orderSlice'

const initialState ={
  request: false,
  success: 0,
  error: false,
  errorCode: ''
}

describe('orderList', () => {
  it("Должен вернуть initialState - orderSlice", () =>{
  expect(reducer(undefined, {})).toEqual(
    initialState
  )
})

  it("orderSuccess", () => {
    const payload = {order:{number:11 }}
    const reduce = reducer(initialState, orderSuccess(payload));
    const result = { 
      error: false,
      errorCode: '',
      success: 11,
      request:false 
    };
    expect(reduce).toEqual(result);
  });


  it("orderError", () => {
    const payload = '123'
    const reduce = reducer(initialState, orderError(payload));
    const result = { 
      ...initialState,
      error: true,
      errorCode: payload,
      request: false
    };
    expect(reduce).toEqual(result);
  });
  
  it("request", () => {
    const reduce = reducer(initialState, request());
    const result = { 
      ...initialState,
      request: true
    };
    expect(reduce).toEqual(result);
  });

})

