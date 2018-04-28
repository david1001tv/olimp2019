import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from '~components/Auth';
import PrivateRoute from '~components/PrivateRoute';
import Menu from '~components/Menu';
import GameComponent from '~components/Game';

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
          <Route
            path="/"
            component={() => <GameComponent />}
          />
        </Switch>
      </main>
    );
  }
}

export default App;
