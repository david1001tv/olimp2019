import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import progressManager from '../../etc/ProgressManager';


import Game from './Game';
import FakeBrowser from '~components/FakeBrowser';
import FixBugs from '~components/fixBugs';

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
        fixBugsIsShow: false,
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
        this.game.setfixBugsEnabled = this.setfixBugsEnabled;
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
    setfixBugsEnabled(enable){
        this.setState({fixBugsIsShow: enable});
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
        if(this.state.fixBugsIsShow){
            return(
                <FixBugs />
            );
        }

        return '';
    }
}

export default GameComponent;
