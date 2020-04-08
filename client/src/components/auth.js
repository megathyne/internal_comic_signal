import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Heading from './Heading';


function PrivateRoute({ children, ...rest }) {
  const authenticated = useSelector((state) => state.authReducer.authenticated);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          <Heading >
            {children}
          </Heading>
        ) : (
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

export default PrivateRoute;
