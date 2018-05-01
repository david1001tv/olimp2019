import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Login from './Login';
import { DialogContainer } from 'react-md';
import './Landing.sass';

class Landing extends Component {
    render() {
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
                            <button className="btn bnt-start" id="start">
                            </button>
                            <button className="btn btn-continue" id="continue">
                            </button>
                        </div>
                    </div>
                    <footer>
                        <div className="likes">Ця гра сподобалась XX користувачів.</div>
                        <div className="copyright">Команда ДВНЗ “ПДТУ”, 2018 ©</div>
                        <button className="btn-feedback" id="btn-feedback">Зворотній зв'язок</button>
                    </footer>
                </div>
                <DialogContainer
                    visible={true}
                >
                    <Login />
                </DialogContainer>
            </div>
        );
    }
}

export default Landing;
