import React, {Component} from 'react';
import {DialogContainer} from 'react-md';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import autobind from 'autobind-decorator';
import {getLike, toggleLike} from '~api';


import Feedback from '../Landing/Feedback';

import './Final.sass';

class Final extends Component {
    state = {
        feedbackIsVisible: false,
        liked: true,
    };

    
    componentDidMount() {
        getLike()
            .then(res => this.setState({liked: res.userLiked}));
    }


    @autobind
    handleLikeClick() {
        this.setState({liked: !this.state.liked});
        toggleLike();
    }
    
    render() {
        const {feedbackIsVisible, liked} = this.state;
        return (
            <div>
                <div className="wrapper">
                    <div className="final-container">
                        <div className="content">
                            <header>
                                <div className="page-title">Вітаємо!</div>
                            </header>
                            <div className="page-subtitle">Ви пройшли квест</div>
                            <div className="game-info">Тепер можете подивитись титри від розробників, таблицю лідерів та
                                коментарі. Не забудьте поставити вподобайку!
                            </div>
                            <iframe src="https://www.youtube.com/embed/DjPRHFw4Go4?rel=0" frameBorder="0"
                                    allow="autoplay; encrypted-media" allowFullScreen></iframe>
                            <div className="soc">
                                <div
                                    className={`like ${liked && 'like--active'}`}
                                    onClick={this.handleLikeClick}
                                ></div>
                                <div className="share">
                                    <div className="facebook"></div>
                                    <div className="twitter"></div>
                                    <div className="google"></div>
                                    <div className="linkedin"></div>
                                </div>
                            </div>
                            <div className="leaderboard">
                                <div className="block-title">Таблиця лідерів</div>
                                <table cellSpacing="0" id="leaderboard">
                                    <tbody>
                                    <tr>
                                        <th>Ім’я</th>
                                        <th>Очки</th>
                                        <th>Час</th>
                                    </tr>
                                    <tr>
                                        <td>Вася</td>
                                        <td>8000</td>
                                        <td>1:30:43</td>
                                    </tr>
                                    <tr>
                                        <td>Альошин</td>
                                        <td>999999</td>
                                        <td>00:43</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <button className="export">Експортувати в Excel</button>
                            </div>
                            <div className="comments">
                                <div className="block-title">Коментарі</div>
                            </div>
                        </div>
                        <footer>
                            <div className="likes">Ця гра сподобалась 543 515 користувачів.</div>
                            <div className="copyright">Команда ДВНЗ “ПДТУ”, 2018 ©</div>
                            <button className="btn-feedback"
                                    id="btn-feedback"
                                    onClick={() => this.setState({feedbackIsVisible: true})}>
                                Зворотній зв'язок
                            </button>
                        </footer>
                    </div>
                </div>
                <DialogContainer
                    focusOnMount={false}
                    visible={feedbackIsVisible}
                    onHide={() => this.setState({feedbackIsVisible: false})}
                >
                    <Feedback/>
                </DialogContainer>
            </div>
        );
    }

    export() {

    }
}

export default Final;