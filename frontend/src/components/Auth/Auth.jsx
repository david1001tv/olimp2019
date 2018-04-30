import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper } from 'react-md';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Login, Register } from './';

import './Auth.sass';

class Auth extends Component {
  render() {
    let redirectTo;
    if (this.props.location.state) { // defaultProps won't work since props.location is always defined
      redirectTo = this.props.location.state.from || '/';
    } else {
      redirectTo = '/';
    }

    return (
        <div>
          <Switch>
            <Redirect
              exact
              from="/auth"
              to="/auth/login"
            />
            <Route
              exact
              path="/auth/login"
              render={() => <Login redirectTo={redirectTo} />}
            />
            <Route
              exact
              path="/auth/register"
              render={() => <Register redirectTo={redirectTo} />}
            />
          </Switch>
        </div>
    );
  }
}

export default Auth;
