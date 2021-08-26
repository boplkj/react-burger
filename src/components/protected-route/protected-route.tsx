
import { Route, Redirect } from 'react-router-dom';
import {getCookie} from '../../services/cookie'

interface IProp {
  children?: any
  rest?: any
  exact?: any,
  path?: any
}
const ProtectedRoute: React.FC<IProp>=({ children, ...rest }) =>{
  const cookie = getCookie("accessToken")




  return (
    <Route
      {...rest}
      render={({ location }) =>
        cookie ? (
          children
        ) : 
        (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
export default ProtectedRoute;
