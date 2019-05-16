import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import Phone from './Phone/Phone';
import GameComponent from './GameComponent';
import phoneAPI from './phoneAPI';
import Map from './Phone/Map/Map';


import './GameWrapper.sass';

class GameWrapper extends Component {
    state = {
        messageText: '',
        messageSource: '',
        charPosition: 0,
        dialogIsShown: false,
        dialogCallback: () => null,
        todos: [],
        phoneIsShown: false,
        phoneMessages: [],
        phoneTime: '00:00',
        phoneDate: '00.00.00',
        phoneEnabled: false,
        mapIsShown: false,
        mapIsCloseable: false
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
                m: !this.state.mapIsShown,
            });
        }
    }

    @autobind
    handleMapSelect(key, isReplaying) {
        this.gameComponent.startState(key, isReplaying);
    }

    render() {
        const {
            dialogIsShown,
            messageText,
            messageSource,
            charPosition,
            phoneIsShown,
            mapIsShown
        } = this.state;
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
                            <div id="dialog-container" className="no-select">
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
                        ref={ref => this.gameComponent = ref}
                    />
                    <button
                        className="show-phone-button"
                        onClick={() => this.setState({mapIsShown: true})}
                    >
                    </button>
                    
                    {
                        mapIsShown
                            ?
                            <Map
                                onClose={() => this.setState({mapIsShown: false})}
                                onSelect={this.handleMapSelect}
                                isCloseable={this.state.mapIsCloseable}
                            />
                            :
                            null
                    }
                </div>
            </div>
        );
    }
}

export default GameWrapper;
