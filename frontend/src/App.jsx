import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from '~components/Auth';
import PrivateRoute from '~components/PrivateRoute';
import Menu from '~components/Menu';

class App extends Component {
  render() {
    console.log('App render');
    return (
      <main>
        <Menu
          onLogOut={() => this.forceUpdate()}
        />
        <Switch>
          <Route path="/auth" component={Auth} />
          <PrivateRoute
            path="/"
            component={() => <div>Super secret content</div>}
          />
        </Switch>
      </main>
    );
  }
}

export default App;
