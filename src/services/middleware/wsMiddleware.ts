
import {
  wsOpenConnection,
  wsError,
  wsClose,
  wsRes,
  wsSuccess
} from '../slices/orderFeedSlice'
import {  getCookie } from "../cookie"
import { MiddlewareAPI, AnyAction} from "redux";

 const wsMiddleware = () => {
  return ( store:MiddlewareAPI ) => {
    let socket:WebSocket|null = null
      return (next:(a: AnyAction) => void) => (action:AnyAction) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if ( type === wsOpenConnection(null).type) {
        if (!payload.user){
          console.log('here???1')
        socket = new WebSocket(payload.url);
        }else if (payload.user){
          const accessToken= getCookie("accessToken")
          console.log('here???', payload.url+`?token=${accessToken}`)

          socket = new WebSocket(payload.url+`?token=${accessToken}`)
        }
      }

      if ( type === wsClose().type ) {
        socket && socket.close();
      }

      if ( socket ) {
        socket.onopen = () => {
          dispatch( wsSuccess() );
        };

        socket.onmessage = ( event ) => {
          const { data } = event;
          const parsedData = JSON.parse( data );
          dispatch(  wsRes(parsedData) );
        };

        socket.onerror = () => {
          dispatch( wsError( ) );
        };

        socket.onclose = () => {
          dispatch( wsClose( ) );
        };
      }
      next( action );
    };
  };
};

export default wsMiddleware;