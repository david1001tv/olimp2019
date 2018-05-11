import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import PrivateRoute from '~components/PrivateRoute';
import GameComponent from '~components/Game';
import Landing from '~components/Landing';
import Final from '~components/Final';


class App extends Component {
    render() {
        console.log('App render');
        return (
            <main>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/game" component={GameComponent} />
                    <Route exact path="/final" component={Final} />
                </Switch>
            </main>
        );
    }
}

export default App;
