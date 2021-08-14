
import {
  wsOpenConnection,
  wsError,
  wsClose,
  wsRes,
  wsSuccess
} from '../slices/orderFeedSlice'
import {  getCookie } from "../cookie"

 const wsMiddleware = () => {
  return ( store:any ) => {
    let socket:any = null
      return (next:any) => (action:any) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if ( type === wsOpenConnection(null).type ) {
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
        socket.onopen = ( event:any ) => {
          dispatch( wsSuccess() );
        };

        socket.onmessage = ( event:any ) => {
          const { data } = event;
          const parsedData = JSON.parse( data );
          dispatch(  wsRes(parsedData) );
        };

        socket.onerror = ( event:any ) => {
          dispatch( wsError( ) );
        };

        socket.onclose = ( event:any ) => {
          dispatch( wsClose( ) );
        };
      }
      next( action );
    };
  };
};

export default wsMiddleware;