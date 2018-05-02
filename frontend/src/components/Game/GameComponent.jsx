import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Game from './Game';

class GameComponent extends Component {
    static defaultProps = {
        inputEnabled: true,
    };

    static propTypes = {
        inputEnabled: PropTypes.bool,
        displayDialogLine: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.game = null;
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.inputEnabled !== this.props.inputEnabled) {
            this.game.input.enabled = nextProps.inputEnabled;
        }
    }


    componentDidMount() {
        this.game = new Game();
        this.game.displayDialogLine = this.props.displayDialogLine;
    }

    render() {
        return (
            ''
        );
    }
}

export default GameComponent;
