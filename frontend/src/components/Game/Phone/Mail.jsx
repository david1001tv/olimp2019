import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import './Mail.sass';


class Mail extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="mail" id="app-mail">
                <div className="head">
                    <div className="title">Входящие</div>
                </div>
                <div className="messages" id="messages">
                    <ul>
                        <li className="message unread">
                            <div className="sender">
                                <i className="fas fa-user icon-user"></i> ПгТУ
                            </div>
                            <div className="theme">
                                <i className="fas fa-envelope icon-letter"></i> Lorem ipsum
                            </div>
                            <div className="text" id="short-message">
                                Lorem ipsum dolor sit amet, consectetur adipisicing.
                            </div>
                            <div className="date">25.04.18</div>
                        </li>
                        <li className="message unread">
                            <div className="sender">
                                <i className="fas fa-user icon-user"></i> ПгТУ
                            </div>
                            <div className="theme">
                                <i className="fas fa-envelope icon-letter"></i> Lorem ipsum
                            </div>
                            <div className="text" id="short-message">
                                Lorem ipsum dolor sit amet, consectetur adipisicing.
                            </div>
                            <div className="date">25.04.18</div>
                        </li>
                        <li className="message">
                            <div className="sender">
                                <i className="fas fa-user icon-user"></i> ПгТУ
                            </div>
                            <div className="theme">
                                <i className="fas fa-envelope-open icon-letter"></i> Lorem ipsum
                            </div>
                            <div className="text" id="short-message">
                                Lorem ipsum dolor sit amet, consectetur adipisicing.
                            </div>
                            <div className="date">24.04.18</div>
                        </li>
                        <li className="message">
                            <div className="sender">
                                <i className="fas fa-user icon-user"></i> ПгТУ
                            </div>
                            <div className="theme">
                                <i className="fas fa-envelope-open icon-letter"></i> Lorem ipsum
                            </div>
                            <div className="text" id="short-message">
                                Lorem ipsum dolor sit amet, consectetur adipisicing.
                            </div>
                            <div className="date">24.04.18</div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Mail;
