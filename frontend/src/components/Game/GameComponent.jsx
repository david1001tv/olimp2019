import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import progressManager from '../../etc/ProgressManager';


import Game from './Game';
import FakeBrowser from '~components/FakeBrowser';
import {Redirect} from 'react-router-dom';


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
        redirectToFinal: false,
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

        this.game.state.onStateChange.add(this.handleGameStateChange, this);

        this.startState = this.game.startState.bind(this.game);
    }

    componentWillUnmount() {
        if (this.game.music) {
            this.game.music.pause();
        }
    }

    @autobind
    setFakeBrowserEnabled(enabled) {
        this.setState({fakeBrowserIsShown: enabled})
    }

    handleGameStateChange(stateName) {
        if (stateName === 'Final') {
            this.setState({redirectToFinal: true})
        }
    }

    render() {
        if (this.state.redirectToFinal) {
            return (
                <Redirect push from="/game" to="/final" />
            )
        }
        
        if (this.state.fakeBrowserIsShown) {
            return (
                <FakeBrowser />
            );
        }

        return '';
    }
}

export default GameComponent;
