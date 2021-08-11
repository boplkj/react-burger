import reducer, {
  registerSucces,
  loginSucsess,
  userInfoSucsess,
  userUpdateInfoSucsess,
  resetPasswordSucsess,
  changePasswordSucsess,
  newTokenSucsess,
  logoutSucsess,
  requestError,
  requestTokenError,
  request
  } from './authSlice'

const initialState = {
    error: false,
    loading : false,
    errorCode: '',
    name:'',
    email:'',
    resetPassword:false,
    logoutToken: false
  }

describe('authSlice', () => {
  it("Должен вернуть initialState - ingredientsListSlice", () =>{
  expect(reducer(undefined, {})).toEqual(
    initialState
  )
})

  it(" (registerSucces) ", () => {
    const payload ={
      ...initialState,
      email: "mail",
      name: "name"
    }
    const reduce = reducer(initialState, registerSucces(payload));
    const result = { ...payload, error:false, loading: false   };
    expect(reduce).toEqual(result);
  });
  
  it(" (loginSucsess) ", () => {
    const payload ={
      ...initialState,
      email: "mail",
      name: "name"
    }
    const reduce = reducer(initialState, loginSucsess(payload));
    const result = { ...payload, error:false, loading: false   };
    expect(reduce).toEqual(result);
  });

  it(" (userInfoSucsess) ", () => {
    const payload ={
      ...initialState,
      email: "mail",
      name: "name"
    }
    const reduce = reducer(initialState, userInfoSucsess(payload));
    const result = { ...payload, error:false, loading: false   };
    expect(reduce).toEqual(result);
  });

  it(" (userUpdateInfoSucsess) ", () => {
    const payload ={
      ...initialState,
      email: "mail",
      name: "name"
    }
    const reduce = reducer(initialState, userUpdateInfoSucsess(payload));
    const result = { ...payload, error:false, loading: false   };
    expect(reduce).toEqual(result);
  });


  it(" (resetPasswordSucsess) ", () => {
    const reduce = reducer(initialState, resetPasswordSucsess());
    const result = {
      ...initialState,
       resetPassword: true,
       error: false,
        loading: false 
      };
    expect(reduce).toEqual(result);
  });

  it(" (changePasswordSucsess) ", () => {
    const reduce = reducer(initialState, changePasswordSucsess());
    const result = {
      ...initialState,
       resetPassword: false,
        error: false,
         loading: false 
        };
    expect(reduce).toEqual(result);
  });

  it(" (newTokenSucsess) ", () => {
    const reduce = reducer(initialState, newTokenSucsess());
    const result = { ...initialState, error: false, loading: false};
    expect(reduce).toEqual(result);
  });  

  it(" (logoutSucsess) ", () => {
    const reduce = reducer(initialState, logoutSucsess());
    const result = {   
      ...initialState, 
      name: '',
      email: '',
      error: false,
      loading: false
    };
    expect(reduce).toEqual(result);
  });  


  it(" (requestError) ", () => {
    const payload ={
      errorCode: "code",
    }
    const reduce = reducer(initialState, requestError(payload));
    const result = {   
        ...initialState, 
        error: true,
        loading: false,
        errorCode: payload
    };
    expect(reduce).toEqual(result);
  });  

  it(" (requestTokenError) ", () => {
    const payload ={
      errorCode: "tokErr",
    }
    const reduce = reducer(initialState, requestTokenError(payload));
    const result = {   
        ...initialState, 
        error: true,
        loading: false,
        errorCode: payload
    };
    expect(reduce).toEqual(result);
  });  

  it(" (request) ", () => {
    const reduce = reducer(initialState, request());
    const result = { ...initialState, error: false, loading: true};
    expect(reduce).toEqual(result);
  });  

})
