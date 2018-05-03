import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Game from './Game';
import FakeBrowser from '~components/FakeBrowser';


class GameComponent extends Component {
    static defaultProps = {
        inputEnabled: true,
    };

    static propTypes = {
        inputEnabled: PropTypes.bool,
        displayDialogLine: PropTypes.func,
        phone: PropTypes.object,
    };

    state = {
        fakeBrowserIsShown: true, // DEBUG
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
        this.game.phone = this.props.phone;
    }

    render() {
        if (this.state.fakeBrowserIsShown) {
            return (
                <FakeBrowser />
            );
        }

        return '';
    }
}

export default GameComponent;
