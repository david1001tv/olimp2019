import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import progressManager from '../../etc/ProgressManager';


import Game from './Game';
import FakeBrowser from '~components/FakeBrowser';
import GoogleMap from '~components/Game/states/FirstStage/GoogleMap/PostRegister';
import Register from '~components/Game/states/FirstStage/Register/registerMain';

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
        registerIsShown: false,
        googleMapIsShown: false,
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
        this.game.setGoogleMapEnabled = this.setGoogleMapEnabled;
        this.game.setRegisterEnabled = this.setRegisterEnabled;

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
        this.setState({fakeBrowserIsShown: enabled});
    }

    @autobind
    setGoogleMapEnabled(enabled) {
        this.state.googleMapIsShown = enabled;
    }

    @autobind
    setRegisterEnabled(enabled) {
        this.state.registerIsShown = enabled;
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

        if (this.state.googleMapIsShown) {
            return (
                <GoogleMap />
            );
        }

        if (this.state.registerIsShown) {
            return (
                <Register />
            );
        }

        return '';
    }
}

export default GameComponent;
