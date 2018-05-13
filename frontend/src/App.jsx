import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import PrivateRoute from '~components/PrivateRoute';
import Loadable from 'react-loadable';


const LoadingScreen = () => {
    return (
        <div className="wrapper">
            <div className="content">
                <h1 className="md-text-center">
                    Завантаження...
                </h1>
            </div>
        </div>
    );
};

const LoadableLanding = Loadable({
    loader: () => import('~components/Landing'),
    loading: LoadingScreen
});

const LoadableGame = Loadable({
    loader: () => import('~components/Game'),
    loading: LoadingScreen
});

const LoadableFinal = Loadable({
    loader: () => import('~components/Final'),
    loading: LoadingScreen
});

class App extends Component {
    render() {
        console.log('App render');
        return (
            <main>
                <Switch>
                    <Route exact path="/" component={LoadableLanding}/>
                    <Route exact path="/game" component={LoadableGame}/>
                    <Route exact path="/final" component={LoadableFinal}/>
                </Switch>
            </main>
        );
    }
}

export default App;
