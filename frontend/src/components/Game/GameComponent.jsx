import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';


import Game from './Game.js';

import './GameComponent.sass';


class GameComponent extends Component {
    state = {
        messageText: '',
        messageSource: '',
        charPosition: 0,
        dialogIsShown: false
    };

    constructor(props) {
        super(props);
        this.game = null;
        this.textAnimationTimer = null;
    }

    componentDidMount() {
        let game = new Game();
        game.displayDialogLine = this.displayDialogLine;
        this.game = game;
    }

    @autobind
    displayDialogLine(source, text) {
        this.setState({
            messageSource: source,
            messageText: text,
            dialogIsShown: true,
            charPosition: 0
        });

        this.textAnimationTimer = setInterval(this.handleTimerTick, 50);
    }

    @autobind
    handleTimerTick() {
        if (this.state.charPosition === this.state.messageText.length) {
            clearInterval(this.textAnimationTimer);
        } else {
            this.setState({
                charPosition: this.state.charPosition + 1
            });
        }
    }

    @autobind
    handleGameContainerClick(e) {
        const {messageText, charPosition, dialogIsShown} = this.state;
        if (dialogIsShown) {
            e.preventDefault();
            if (charPosition === messageText.length) {
                this.setState({dialogIsShown: false});
                clearInterval(this.textAnimationTimer);
                this.game.next();
            }
            if (charPosition < messageText.length) {
                this.setState({charPosition: messageText.length});
            }
        }
    }

    render() {
        const {dialogIsShown, messageText, messageSource, charPosition} = this.state;
        return (
            <div
                id="game-container-wrapper"
                onClick={this.handleGameContainerClick}
            >
                <div id="game-container">
                    {
                        dialogIsShown ?
                            <div id="dialog-container">
                                <div id="message-source">{messageSource}</div>
                                <div id="message-text">{messageText.slice(0, charPosition)}</div>
                                { charPosition === messageText.length ? <div id="message-hint"><em>Клацніть мишкою, щоб продовжити...</em></div> : null }
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        );
    }
}

export default GameComponent;
