import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import Game from './Game.js';
import Phone from './Phone/Phone';
import GameComponent from './GameComponent';
import phoneAPI from './phoneAPI';

import './GameWrapper.sass';

class GameWrapper extends Component {
    state = {
        messageText: '',
        messageSource: '',
        charPosition: 0,
        dialogIsShown: false,
        phoneIsShown: false,
        dialogCallback: () => null,
        todos: [],
        phoneMessages: [],
        phoneTime: '',
        phoneDate: '',
        phoneEnabled: false,
    };

    constructor(props) {
        super(props);
        this.textAnimationTimer = null;
        this.phoneAPI = {...phoneAPI};
        for (let key in this.phoneAPI) {
            this.phoneAPI[key] = this.phoneAPI[key].bind(this);
        }
    }

    @autobind
    displayDialogLine(source, text, callback) {
        if (!callback)
            callback = () => null;
        this.setState({
            messageSource: source,
            messageText: text,
            dialogIsShown: true,
            charPosition: 0,
            phoneIsShown: false,
            dialogCallback: callback,
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
    handleGameContainerClick() {
        const {messageText, charPosition, dialogIsShown} = this.state;
        if (dialogIsShown) {
            if (charPosition === messageText.length) {
                this.setState({dialogIsShown: false});
                clearInterval(this.textAnimationTimer);
                this.state.dialogCallback();
            }
            if (charPosition < messageText.length) {
                this.setState({charPosition: messageText.length});
            }
        }
    }

    @autobind
    handleShowPhoneButtonClick() {
        if (!this.state.dialogIsShown) {
            this.setState({
                phoneIsShown: !this.state.phoneIsShown,
            });
        }
    }

    render() {
        const {dialogIsShown, messageText, messageSource, charPosition, phoneIsShown} = this.state;
        return (
            <div
                id="game-container-wrapper"
            >
                <div
                    id="game-container"
                    className={phoneIsShown ? 'blurred' : ''}
                    onClick={this.handleGameContainerClick}
                >
                    {
                        dialogIsShown ?
                            <div id="dialog-container">
                                <div id="message-source">{messageSource}</div>
                                <div id="message-text">{messageText.slice(0, charPosition)}</div>
                                {
                                    charPosition === messageText.length
                                        ?
                                        <div id="message-hint"><em>Клацніть мишкою, щоб продовжити...</em></div>
                                        :
                                        null
                                }
                            </div>
                            :
                            null
                    }
                    <GameComponent
                        inputEnabled={!phoneIsShown && !dialogIsShown}
                        displayDialogLine={this.displayDialogLine}
                        phone={this.phoneAPI}
                    />
                    <button
                        className="show-phone-button"
                        onClick={this.handleShowPhoneButtonClick}
                    >
                    </button>
                    <Phone
                        isShown={phoneIsShown}
                        todos={this.state.todos}
                        messages={this.state.phoneMessages}
                        time={this.state.phoneTime}
                        date={this.state.phoneDate}
                    />
                </div>
            </div>
        );
    }
}

export default GameWrapper;
