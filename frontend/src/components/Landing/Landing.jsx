import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DialogContainer} from 'react-md';
import {Link} from 'react-router-dom';
import autobind from 'autobind-decorator';
import photo from '../../img/photo.jpg'

import Login from './Login';
import Feedback from './Feedback';
//import './Landing.sass';
import './main.sass';
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
        logOut();
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
                      
                    </footer>
                </div>
             
            </div>
        );
             
    }
}

export default Landing;
