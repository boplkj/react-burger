import reducer, {feedSuccess, feedError, request} from './oneFeedSlice'

const initialState ={
  order: [],
  request: false,
  success: false,
  error: false,
  errorCode: ''
}

describe('orderList', () => {
  it("Должен вернуть initialState - oneFeedSlice", () =>{
  expect(reducer(undefined, {})).toEqual(
    initialState
  )
})

  it("feedSuccess", () => {
    const payload = 31
    const reduce = reducer(initialState, feedSuccess(payload));
    const result = { 
      ...initialState,
      error: false,
      errorCode: '',
      order: 31,
      request:false
    };
    expect(reduce).toEqual(result);
  });


  it("feedError", () => {
    const payload = '123'
    const reduce = reducer(initialState, feedError(payload));
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

