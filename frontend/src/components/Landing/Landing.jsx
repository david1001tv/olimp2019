import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DialogContainer } from 'react-md';
import { Link } from 'react-router-dom';


import Login from './Login';
import './Landing.sass';

class Landing extends Component {
    state = {
        formIsVisible: false,
    };

    render() {
        const {formIsVisible} = this.state;

        return (
            <div>
                <div className="wrapper">
                    <div className="content">
                        <header>
                            <div class="page-title">Квест “Абітурієнт”</div>
                        </header>
                        <div className="page-subtitle">Вітаємо вас на нашому учбово-розважальному порталі!</div>
                        <div className="game-info">Пориньте в історію вступу до установи вищої освіти. Ваше завдання полягає у проходженні тернистого шляху абітурієнта, який проходить вступну компанію та знайомиться зі специфікою своєї професії!</div>
                        <div className="buttons">
                            <button
                                className="btn bnt-start"
                                id="start"
                            >
                                <Link style={{display: 'block', height: '100%'}} to="/game" />
                            </button>
                            <button
                                className="btn btn-continue"
                                id="continue"
                                onClick={() => this.setState({formIsVisible: true})}
                            />
                        </div>
                    </div>
                    <footer>
                        <div className="likes">Ця гра сподобалась XX користувачів.</div>
                        <div className="copyright">Команда ДВНЗ “ПДТУ”, 2018 ©</div>
                        <button className="btn-feedback" id="btn-feedback">Зворотній зв'язок</button>
                    </footer>
                </div>
                <DialogContainer
                    focusOnMount={false}
                    visible={formIsVisible}
                    onHide={() => this.setState({formIsVisible: false})}
                >
                    <Login />
                </DialogContainer>
            </div>
        );
    }
}

export default Landing;
