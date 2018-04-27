import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '~api';


export default function PrivateRoute({ component: Component, ...rest }) {
  console.log('PrivateRoute render');

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated() === true) {
          return <Component {...props} />;
        }

        return <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />;
      }}
    />
  );
}
