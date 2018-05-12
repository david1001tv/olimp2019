import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import logoPstu from '~img/logo-pstu.png';

import './Mail.sass';


class Mail extends Component {
    static propTypes = {
        messages: PropTypes.array
    };

    state = {
        activeMessage: null,
    };

    constructor(props) {
        super(props);

    }

    handleMessageClick(message) {
        this.setState({
            activeMessage: message,
        })
    }

    render() {
        const {messages} = this.props;
        const {activeMessage} = this.state;

        if (activeMessage === null) {
            return (
                <div className="mail" id="app-mail">
                    <div className="head">
                        <div className="title">Вхідні</div>
                    </div>
                    <div className="messages" id="messages">
                        <ul>
                            {
                                messages.map(message => (
                                    <li
                                        className={`message ${message.isRead ? '' : 'unread'}`}
                                        onClick={() => this.handleMessageClick(message)}
                                    >
                                        <div className="sender">
                                            <i className="fas fa-user icon-user"></i>
                                            {message.sender}
                                        </div>
                                        <div className="theme">
                                            <i className="fas fa-envelope icon-letter"></i>
                                            {message.theme}
                                        </div>
                                        <div className="text">
                                            {message.preview.slice(0, 100) + '...'}
                                        </div>
                                        <div className="date">{message.date}</div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            );
        }

        return (
            <div className="mail">
                <div class="letter">
                    <div class="head">
                        <i
                            class="fas fa-arrow-left title"
                            id="letter-back"
                            onClick={() => this.setState({activeMessage: null})}
                        />
                    </div>
                    <div class="content">
                        <div class="theme">{activeMessage.theme}</div>
                        <div class="info">
                            <div class="logo">
                                <img src={logoPstu} alt="Відправник" />
                            </div>
                            <div class="user-info">
                                <div class="sender">Від: {activeMessage.sender}</div>
                                <div class="recipient">Кому: мені</div>
                                <div class="date">{activeMessage.date}</div>
                            </div>
                        </div>
                        <div class="text">
                            {activeMessage.text}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Mail;
