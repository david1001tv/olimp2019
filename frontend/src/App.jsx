import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import Auth from '~components/Auth';
import PrivateRoute from '~components/PrivateRoute';
import GameComponent from '~components/Game';
import Landing from '~components/Landing';


class App extends Component {
    render() {
        console.log('App render');
        return (
            <main>
                <Switch>
                    <Route path="/auth" component={Auth} />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/game" component={GameComponent} />
                </Switch>
            </main>
        );
    }
}

export default App;
