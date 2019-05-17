import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DialogContainer} from 'react-md';
import {Link} from 'react-router-dom';
import autobind from 'autobind-decorator';
import photo from '../../img/photo.jpg'
 
import Team from './Team';
import Login from './Login';
import Regulations from './Regulations';
import Feedback from './Feedback';
import './main.sass';
import './media.sass';
import {logOut, getLikeCount} from '~api';

  
class Landing extends Component {
    state = {
        formIsVisible: false,
        feedbackIsVisible: false,
        regulationVisible: false,
        teamVisible: false,
        likeCount: 6
    };

    handleStartButtonClick() {
        logOut();
    }

    componentDidMount() { // вызывается после рендринга компонента
        logOut();
        getLikeCount()
            .then(res => this.setState({likeCount: res.count}));
    }

    render() {
        const {formIsVisible, feedbackIsVisible, regulationVisible, likeCount, teamVisible} = this.state;

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
               Хочете дізнатися, як стають ІТ-фахівцями? Пориньте в дивовижну і
                реалістичну історію становлення фахівцем найпрестижнішої професії
                 нашого часу. Пройдіть шлях від вибору спеціальності, навчання в 
                 університеті і працевлаштування до професійного та кар'єрного росту.
                  Світ ІТ ближче, ніж Вам здається...
               </p>
               </div>
    </div>
    <div className="wrapper">
    <div className="main-button">
    <div className="but-start">
    <Link className="gogame" to="/game" onClick={() => logOut()}><p>ПОЧАТИ РУХ</p></Link>
           
      </div>
      <div className="but-cont">
              <button  onClick={() => this.setState({formIsVisible: true})}><p>ПРОДОВЖИТИ</p></button>
      </div>
    </div>



</div>

 <div className="footer">
    <div className="butf">
        <div className="wrap">
        <div className="link-f"><div onClick={() => this.setState({regulationVisible: true})}> <p> Про квест</p></div></div>
        <div className="link-f"><div onClick={() => this.setState({teamVisible: true})}><p> КОМАНДА ДВНЗ “ПДТУ”, 2019 ©</p></div></div>
        <div className="link-f"><div onClick={() => this.setState({feedbackIsVisible: true})}><p> Зворотній зв'язок</p></div></div>
        <div className="link-f"> <div><a href="https://pstu.edu/ru/"> ОФІЦІЙНИЙ САЙТ ПДТУ</a></div></div>
    </div>
    </div>
</div>
    </div>
    <DialogContainer
                    focusOnMount={false}
                    visible={formIsVisible}
                    onHide={() => this.setState({formIsVisible: false})}
                    dialogClassName="login_main"
                    contentClassName="container_log"
                >
                    <Login />
                </DialogContainer>
                <DialogContainer
                    focusOnMount={false}
                    visible={feedbackIsVisible}
                    onHide={() => this.setState({feedbackIsVisible: false})}
                    dialogClassName="opis_g2"
                    contentClassName="opis_container2"
                >
                    <Feedback />
                </DialogContainer>
                <DialogContainer
                    focusOnMount={false}
                    visible={regulationVisible}
                    onHide={() => this.setState({regulationVisible: false})}
                    dialogClassName="opis_g"
                    contentClassName="opis_container"
                >
                <Regulations />
                </DialogContainer>
                <DialogContainer
                      focusOnMount={false}
                      visible={teamVisible}
                      onHide={() => this.setState({teamVisible: false})}
                      dialogClassName="photo"
                      contentClassName="opis_container"
                >
                    <Team />
                </DialogContainer>
</div>

        );
             
    }
}

export default Landing;
