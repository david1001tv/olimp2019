import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Game from './Game.js';


class GameComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.game = new Game();
    }

    render() {
        return (
            <div id="game-container"/>
        );
    }
}

export default GameComponent;
