import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// function PrivateRoute({ component: Component, ...rest }) {

//   return <Route {...rest} render={(props) => (authenticated ? <Component {...props} /> : <Redirect to="/login" />)} />;
// }

function PrivateRoute({ children, ...rest }) {
  const authenticated = useSelector((state) => state.authReducer.authenticated);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          children
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
