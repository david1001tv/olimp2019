import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import progressManager from '../../etc/ProgressManager';


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
        fakeBrowserIsShown: false,
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
        this.game = new Game(this.props.phone, progressManager);
        this.game.displayDialogLine = this.props.displayDialogLine;
        this.game.phone = this.props.phone;
        this.game.setFakeBrowserEnabled = this.setFakeBrowserEnabled;

        this.startState = this.game.startState.bind(this.game);
    }

    @autobind
    setFakeBrowserEnabled(enabled) {
        this.setState({fakeBrowserIsShown: enabled})
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
