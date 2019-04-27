import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DialogContainer} from 'react-md';
import {Link} from 'react-router-dom';
import autobind from 'autobind-decorator';
import photo from '../../img/photo.jpg'

import Login from './Login';
import Feedback from './Feedback';
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
        <div className="main">
            <div className="main-text">
            <div className="for_t">
                 <h1>
            Квест “Моя майбутня професiя”
        </h1>
        </div>
       
    </div>
    <div className="main-text_p">
            <div className="text_p">
               <p>
                    Пориньте в історію вступу до установи вищої освіти.
                     Ваше завдання полягає у подоланні тернистого шляху 
                     абітурієнта, який проходить вступну кампанію та знайомиться
                      зі специфікою своєї професії!
               </p>
               </div>
    </div>
    <div className="wrapper">
    <div className="main-button">
        <div className="but-start">
          
            <a href="#"><p>ПОЧАТИ РУХ</p></a>
        </div>
        <div className="but-cont">
                <a href="#"><p>ПРОДОВЖИТИ</p></a>
        </div>
    </div>



</div>

 <div className="footer">
    <div className="butf">
        <div className="wrap">
        <div className="link-f"><div> <p> Правила Квесту</p></div></div>
        <div className="link-f"><div><p> КОМАНДА ДВНЗ “ПДТУ”, 2019 ©</p></div></div>
        <div className="link-f"><div  onClick={() => this.setState({feedbackIsVisible: true})}><p> Зворотній зв'язок</p></div></div>
        <div className="link-f"> <div><p> ОФІЦІЙНИЙ САЙТ ПДТУ</p></div></div>
    </div>
    </div>
</div>
    </div>

    <DialogContainer
        focusOnMount={false}
        visible={feedbackIsVisible}
        onHide={() => this.setState({feedbackIsVisible: false})}
    >
        <Feedback />
    </DialogContainer>

</div>

        );
             
    }
}

export default Landing;
