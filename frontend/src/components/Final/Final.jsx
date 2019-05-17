import React, {Component} from 'react';
import {DialogContainer} from 'react-md';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import autobind from 'autobind-decorator';
import ReactDisqusComments from 'react-disqus-comments';
import {getLike, toggleLike, getLikeCount} from '~api';
import Leaderboard from './Leaderboard';
import photo from '../../img/photo.jpg'


import Feedback from '../Landing/Feedback';

import '../Landing/Landing.sass';
import './Final.sass';



class Final extends Component {
    state = {
        feedbackIsVisible: false,
        liked: true,
        likeCount: 6
    };

    
    componentDidMount() {
        getLike()
            .then(res => this.setState({liked: res.userLiked}));
        getLikeCount()
            .then(res => this.setState({likeCount: res.count}));
    }


    @autobind
    handleLikeClick() {
        this.setState({liked: !this.state.liked});
        toggleLike();
    }
    
    render() {
        const {feedbackIsVisible, liked, likeCount} = this.state;
        return (
            <div>
                <div className="wrapper">
                    <div className="final-container">
                        <div className="content">
                            <header>
                                <div className="page-title">Вітаємо!</div>
                            </header>
                            {/*<div className="page-subtitle">Ви пройшли квест</div>*/}
                            {/*<div className="game-info">Тепер можете подивитись титри від розробників, таблицю лідерів та*/}
                            {/*    коментарі. Не забудьте поставити вподобайку!*/}
                            {/*</div>*/}
                            {/*<iframe src="https://www.youtube.com/embed/DjPRHFw4Go4?rel=0" frameBorder="0"*/}
                            {/*        allow="autoplay; encrypted-media" allowFullScreen></iframe>*/}
                            <div className="soc">
                                <div
                                    className={`like ${liked && 'like--active'}`}
                                    onClick={this.handleLikeClick}
                                ></div>
                                <div className="share">
                                    <a
                                        className="facebook"
                                        href="https://www.facebook.com/sharer/sharer.php?u=http%3A//olymp2019.fruch.pw/"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    />
                                    <a
                                        className="twitter"
                                        href={encodeURI(`https://twitter.com/intent/tweet?text=Я пройшов квест "Абітурієнт". Спробуй і ти!&url=http://olymp2019.fruch.pw`)}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    />
                                    <a
                                        className="google"
                                        href={encodeURI(`https://plus.google.com/share?text=Я пройшов квест "Абітурієнт". Спробуй і ти!&url=http://olymp2019.fruch.pw`)}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    />
                                    <a
                                        className="linkedin"
                                        href="https://www.linkedin.com/shareArticle?mini=true&url=http%3A//olymp2019.fruch.pw/&title=%D0%9A%D0%B2%D0%B5%D1%81%D1%82%20%22%D0%90%D0%B1%D1%96%D1%82%D1%83%D1%80%D1%96%D1%94%D0%BD%D1%82%22&summary=%D0%9F%D0%BE%D1%80%D0%B8%D0%BD%D1%8C%D1%82%D0%B5%20%D0%B2%20%D1%96%D1%81%D1%82%D0%BE%D1%80%D1%96%D1%8E%20%D0%B2%D1%81%D1%82%D1%83%D0%BF%D1%83%20%D0%B4%D0%BE%20%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%B8%20%D0%B2%D0%B8%D1%89%D0%BE%D1%97%20%D0%BE%D1%81%D0%B2%D1%96%D1%82%D0%B8.%20%D0%92%D0%B0%D1%88%D0%B5%20%D0%B7%D0%B0%D0%B2%D0%B4%D0%B0%D0%BD%D0%BD%D1%8F%20%D0%BF%D0%BE%D0%BB%D1%8F%D0%B3%D0%B0%D1%94%20%D1%83%20%D0%BF%D0%BE%D0%B4%D0%BE%D0%BB%D0%B0%D0%BD%D0%BD%D1%96%20%D1%82%D0%B5%D1%80%D0%BD%D0%B8%D1%81%D1%82%D0%BE%D0%B3%D0%BE%20%D1%88%D0%BB%D1%8F%D1%85%D1%83%20%D0%B0%D0%B1%D1%96%D1%82%D1%83%D1%80%D1%96%D1%94%D0%BD%D1%82%D0%B0,%20%D1%8F%D0%BA%D0%B8%D0%B9%20%D0%BF%D1%80%D0%BE%D1%85%D0%BE%D0%B4%D0%B8%D1%82%D1%8C%20%D0%B2%D1%81%D1%82%D1%83%D0%BF%D0%BD%D1%83%20%D0%BA%D0%B0%D0%BC%D0%BF%D0%B0%D0%BD%D1%96%D1%8E%20%D1%82%D0%B0%20%D0%B7%D0%BD%D0%B0%D0%B9%D0%BE%D0%BC%D0%B8%D1%82%D1%8C%D1%81%D1%8F%20%D0%B7%D1%96%20%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D1%84%D1%96%D0%BA%D0%BE%D1%8E%20%D1%81%D0%B2%D0%BE%D1%94%D1%97%20%D0%BF%D1%80%D0%BE%D1%84%D0%B5%D1%81%D1%96%D1%97!&source="
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    />
                                </div>
                            </div>
                            <div className="leaderboard">
                                <div className="block-title">Таблиця лідерів</div>
                                <Leaderboard />
                                <a href="/api/report/excel" target="_blank" className="export">Завантажити повний звіт в Excel</a>
                            </div>
                            <div className="comments">
                                <div className="block-title">Коментарі</div>
                                <ReactDisqusComments
                                    shortname="http-olimp2019-fruch-pw"
                                    identifier="something-unique-12345"
                                    url="https://www.olymp.fruch.pw/final"
                                />
                            </div>
                        </div>
                        <footer>
                            <div className="likes">Ця гра сподобалась {likeCount} користувачам.</div>
                            <div className="copyright">
                                <span>КОМАНДА ДВНЗ “ПДТУ”, 2019 ©
                                <img className="photo" id="photo" src={photo} alt="" />
                            </span>
                            </div>
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
                    dialogClassName="opis_g2"
                    contentClassName="opis_container"
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