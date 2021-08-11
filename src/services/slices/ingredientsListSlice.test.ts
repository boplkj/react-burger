import reducer, {request, requestError, requestSucces} from './ingredientsListSlice'

const initialState ={
error: false,
loadingData: [],
loading : false,
errorCode: ''
}

describe('ingredientList', () => {
  it("Должен вернуть initialState - ingredientsListSlice", () =>{
  expect(reducer(undefined, {})).toEqual(
    initialState
  )
})

  it("Должен вернуть статус Error при  запросе", () => {
    const payload = 'errCode'
    const reduce = reducer(initialState, requestError(payload));
    const result = { ...initialState, error: true, errorCode: payload  };
    expect(reduce).toEqual(result);
  });

  it("Должен вернуть LoadingData при запросе", () => {
    const payload = ['deed', 'eedfe']
    const reduce = reducer(initialState, requestSucces(payload));
    const result = { ...initialState, loadingData: payload, error: false, loading: false };
    expect(reduce).toEqual(result);
  });

  it("Должен вернуть loading при запросе", () => {
    const reduce = reducer(initialState, request());
    const result = {...initialState, loadingData:[], error: false, loading: true };
    expect(reduce).toEqual(result);
  });

})
