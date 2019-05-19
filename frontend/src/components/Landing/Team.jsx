import React, {Component} from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';
import line from '../../img/login/line.png';
import kostya from '../../img/team/kostya.png';
import sasha from '../../img/team/sasha.png';
import natasha from '../../img/team/natasha.png';
import nastya from '../../img/team/nastya.png';
import ilya from '../../img/team/ilya.png';
import david from '../../img/team/david.png';
class Team extends Component{


    render(){
        return(
           <div>
               <h1 className="photo_h1">
                   НАША КОМАНДА
               </h1>
                <div className="wrap_ab">
                    <img src={line} alt=""/>
                    <h2>Команда ДВНЗ “ПДТУ”</h2>
                    <img src={line} alt=""/>
                </div>
                <div className="wrap-item">
                    <div className="items">
                        <img src={kostya} alt=""/>
                        <h1>Костянтин ЯКІН </h1>
                        <h2>Team Leader, <br/> Project manager</h2>
                    </div>
                    <div className="items">
                    <div className="items">
                        <img src={natasha} alt=""/>
                        <h1>Наталя Кульбака</h1>
                        <h2>Game Developer</h2>
                    </div>
                    </div>
                    <div className="items">
                    <div className="items">
                        <img src={nastya} alt=""/>
                        <h1>Анастасія Бухарова</h1>
                        <h2>Designer, <br/> illustrator</h2>
                    </div>
                    </div>
                    <div className="items">
                    <div className="items">
                        <img src={david} alt=""/>
                        <h1>Давід юхно</h1>
                        <h2>Full stack developer, <br/>game developer</h2>
                    </div>
                    </div>
                    <div className="items">
                    <div className="items">
                        <img src={ilya} alt=""/>
                        <h1>Ілля Подольніков</h1>
                        <h2>Game developer,<br/> incognita</h2>
                    </div>
                    </div>
                    <div className="items">
                    <div className="items">
                        <img src={sasha} alt=""/>
                        <h1>Олександр Яремко</h1>
                        <h2>Front-end developer</h2>
                    </div>
                    </div>
                </div>
           </div>
        );
    }
}

export default Team;