import { createSlice, Dispatch } from '@reduxjs/toolkit'
import {REGISTER_URL, LOGIN_URL,USER_INfO_URL,PASSWORD_RESET_URL,RESET_TOKEN_URL} from '../../components/utils/url'
import { setCookie, getCookie, deleteCookie } from "../cookie"

interface IData {
  name?:string
  email?:string
  password?:string
  token?: string

}
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    error: false,
    loading : false,
    errorCode: '',
    name:'',
    email:'',
    resetPassword:false,
    logoutToken: false
  },
  reducers: {
    registerSucces: (state, action) => {
      return { 
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        error: false,
        loading: false
      }
    },
    loginSucsess: (state, action) => {
      return { 
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        error: false,
        loading: false
      }
    },
    userInfoSucsess: (state, action) => {
      return { 
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        error: false,
        loading: false
      }
    },
    userUpdateInfoSucsess: (state, action) => {
      return { 
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        error: false,
        loading: false
      }
    },
    resetPasswordSucsess: (state,) => {
      return { 
        ...state,
        resetPassword: true,
        error: false,
        loading: false
      }
    },
    changePasswordSucsess: (state) => {
      return { 
        ...state,
        resetPassword: false,
        error: false,
        loading: false
      }
    },
    newTokenSucsess: (state) => {
      return { 
        ...state,
        error: false,
        loading: false
      }
    },
    logoutSucsess: (state) => {
      return { 
        ...state,
        name: '',
        email: '',
        error: false,
        loading: false
      }
    },

    requestError: (state, action) => {
      return {
        ...state,
        error: true,
        loading: false,
        errorCode: action.payload
      }
    },
    requestTokenError: (state, action) => {
      return {
        ...state,
        error: true,
        loading: false,
        errorCode: action.payload
      }
    },
    request: (state) => {
      return {
        ...state,
        error: false,
        loading: true
      }
    },
  }
}) 

export const {
   registerSucces,
   loginSucsess,
   userInfoSucsess,
   userUpdateInfoSucsess,
   resetPasswordSucsess,
   changePasswordSucsess,
   newTokenSucsess,
   logoutSucsess,
   requestTokenError,
   requestError,
   request 
  } = authSlice.actions

export const registerRequest = (data:IData) => (dispatch:Dispatch) => {
  dispatch(request())
  fetch(REGISTER_URL, {   
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .then(({ accessToken, refreshToken, user  }) => {
      dispatch(registerSucces(user))
      if(accessToken){
        const token = accessToken.split('Bearer ')[1];
        setCookie('accessToken', token);  
      }
      if(refreshToken){
          setCookie('refreshToken', refreshToken);  
      }
    })
    .catch((e) => {
      dispatch(requestError("Ошибка HTTP: " + e))
    })
}

export const loginRequest = (data: IData) => (dispatch:Dispatch) => {
  dispatch(request())
  fetch(LOGIN_URL, {   
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .then(({ accessToken, refreshToken, user  }) => {
      dispatch(loginSucsess(user))
      if(accessToken){
        const token = accessToken.split('Bearer ')[1];
        setCookie('accessToken', token);  
      }
      if(refreshToken){
          setCookie('refreshToken', refreshToken);  
      }
    })
    .catch((e) => {
      dispatch(requestError("Ошибка HTTP: " + e))
    })
}

export  const userInfoRequest = () => (dispatch:any) => {
  dispatch(request())
  fetch(USER_INfO_URL, {   
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie("accessToken")
  },
 
})
    .then(async res => {
      if(res.ok){
        res.json()
        .then(({ user }) => {
          dispatch(userInfoSucsess(user))
        })
      }else if (!res.ok){
        const ress = await res.json()
        if(ress.message === 'jwt expired' && getCookie("accessToken")){
          await dispatch(newTokenRequest());
		      await dispatch(userInfoRequest());
        }
      }else{
           Promise.reject(res.status)
          }
        })
    
    .catch((e) => {
      dispatch(requestError("Ошибка HTTP: " + e))
    })
}

export const userUpdateInfoRequest = (data:IData) => (dispatch:Dispatch) => {
  dispatch(request())
  fetch(USER_INfO_URL, {   
  method: 'PATCH',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + getCookie("accessToken")
  },
  body: JSON.stringify(data),
  
})
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .then(({user}) => {
      dispatch(userUpdateInfoSucsess(user))
    })
    .catch((e) => {
      deleteCookie()
      dispatch(requestError("Ошибка HTTP: " + e))
    })
}

export const resetPasswordRequest = (data:IData) => (dispatch:Dispatch) => {
  dispatch(request())
  fetch(PASSWORD_RESET_URL, {   
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .then(({ success }) => {
     success && 
      dispatch(resetPasswordSucsess())
    })
    .catch((e) => {
      dispatch(requestError("Ошибка HTTP: " + e))
    })
}


export const changePasswordRequest = (data:IData) => (dispatch:Dispatch) => {
  dispatch(request())
  fetch(PASSWORD_RESET_URL, {   
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .then(({ success  }) => {
      success && 
      dispatch(changePasswordSucsess())
    })
    .catch((e) => {
      dispatch(requestError("Ошибка HTTP: " + e))
    })
}

export const newTokenRequest = () => (dispatch:Dispatch) => {
  dispatch(request())
  fetch(RESET_TOKEN_URL, {   
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({token: getCookie('refreshToken')})	
})
    .then(res=>res.json())
    .then(({ accessToken, refreshToken }) => {

      if(accessToken){
        const token = accessToken.split('Bearer ')[1];
        setCookie('accessToken', token);  
      }
      if(refreshToken){
        setCookie('refreshToken', refreshToken);  
      }
      dispatch(newTokenSucsess())
    })
    .catch((e) => {
      deleteCookie()
      dispatch(requestTokenError("Ошибка HTTP: " + e))
    })
}

export const logoutRequest = () => (dispatch:Dispatch) => {
  dispatch(request())
  fetch(PASSWORD_RESET_URL, {   
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({token: getCookie('refreshToken')})	
})
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .then(({ accessToken, refreshToken, user  }) => {
      deleteCookie()
      dispatch(logoutSucsess())
    })
    .catch((e) => {
      dispatch(requestError("Ошибка HTTP: " + e))
    })
}


export default authSlice.reducer
