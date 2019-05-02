import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import PrivateRoute from '~components/PrivateRoute';
import Loadable from 'react-loadable';
import './app.sass';
/*


*/



const LoadingScreen = () => {
    return (
       
        <div className="start">
            
                <h1 className="text-cen">
                    Завантаження...
                 </h1>
            
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
