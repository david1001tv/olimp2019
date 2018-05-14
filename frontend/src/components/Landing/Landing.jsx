import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DialogContainer} from 'react-md';
import {Link} from 'react-router-dom';
import autobind from 'autobind-decorator';
import photo from '../../img/bg.jpg'

import Login from './Login';
import Feedback from './Feedback';
import './Landing.sass';
import {logOut, getLikeCount} from '~api';


class Landing extends Component {
    state = {
        formIsVisible: false,
        feedbackIsVisible: false,
        likeCount: 6
    };

    handleStartButtonClick() {
        logOut();
    }

    componentDidMount() {
        getLikeCount()
            .then(res => this.setState({likeCount: res.count}));
    }

    render() {
        const {formIsVisible, feedbackIsVisible, likeCount} = this.state;

        return (
            <div>
                <div className="wrapper">
                    <div className="content">
                        <header>
                            <div className ="page-title">Квест “Абітурієнт”</div>
                        </header>
                        <div className="page-subtitle">Вітаємо вас на нашому учбово-розважальному порталі!</div>
                        <div className="game-info">Пориньте в історію вступу до установи вищої освіти. Ваше завдання
                            полягає у подоланні тернистого шляху абітурієнта, який проходить вступну кампанію та
                            знайомиться зі специфікою своєї професії!
                        </div>
                        <div className="buttons">
                            <Link className="btn btn-start" to="/game" onClick={() => logOut()}/>
                            <button
                                className="btn btn-continue"
                                onClick={() => this.setState({formIsVisible: true})}
                            />
                        </div>
                    </div>
                    <footer>
                        <div className="likes">Ця гра сподобалась {likeCount} користувачам.</div>
                        <div className="copyright">Команда ДВНЗ “ПДТУ”, 2018 ©</div>
                        <button className="btn-feedback"
                                id="btn-feedback"
                                onClick={() => this.setState({feedbackIsVisible: true})}>
                                Зворотній зв'язок
                        </button>
                    </footer>
                </div>
                <DialogContainer
                    focusOnMount={false}
                    visible={formIsVisible}
                    onHide={() => this.setState({formIsVisible: false})}
                >
                    <Login />
                </DialogContainer>
                <DialogContainer
                    focusOnMount={false}
                    visible={feedbackIsVisible}
                    onHide={() => this.setState({feedbackIsVisible: false})}
                >
                    <Feedback />
                </DialogContainer>
                <img className="photo" id="photo" src={photo} alt="" />
            </div>
        )
            ;
    }
}

export default Landing;
