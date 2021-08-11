
import { Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {RootState}  from '../../services/store'

interface IProp {
  children?: any
  rest?: any
  exact?: any,
  path?: any
}
const ProtectedRoute: React.FC<IProp>=({ children, ...rest }) =>{
  const store  = useSelector((store:RootState) => store.auth)
  console.log(typeof(rest), 'storeee')

  return (
    <Route
      {...rest}
      render={({ location }) =>
        store.email ? (
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
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  rest: PropTypes.object
};

export default ProtectedRoute;
