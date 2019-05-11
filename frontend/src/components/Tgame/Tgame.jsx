import React, {Component} from 'react';

import Cell from './Cell';
import './tgame.sass';

import PubSub from 'pubsub-js';
 
class Tgame extends Component {
    
    state = {
        styleTd: {
            border: "1px solid black",
			width: `75px`,
			height: `75px`,
			textAlign: `center`,
			backgroundColor: `blue`,
        },
        styleRed: {
            backgroundColor: `red`
        },
        massCell: [
            [],
            [],
            [],
            [],
            []
        ],
        isgood: false
    }

    constructor(props) {
       super(props); 
       


       for(let i = 0; i < 5; i++){
           for(let j = 0; j < 5; j++){
               if(j === 2 && i === 2){
                this.state.massCell[i].push( <Cell dataRow={i} dataColumn={j} text={"a"} bColor = {"red"} /> );
               }else{
                this.state.massCell[i].push( <Cell dataRow={i} dataColumn={j} text={"a"} /> );
               }
            
           }
       }
    }
    handleContinue() {
        setTimeout(() => PubSub.publish('goNext', 'yes'), 500); // говно
    }

 
    isGood(){
 
        let good = 0;

        let trAll = document.querySelectorAll("td");
        trAll.forEach((value) => {
           if(value.style.backgroundColor == "red"){
            ++good;
           }
        });
       // console.log(good);
        if(good == 25){
            this.setState({isgood: true });
            document.querySelector("table").addEventListener("click", (e) => {
                e.stopPropagation();
            });
        }
    }

 
    render() {
        return (
            <div className="tgame">

              <table onClick={this.isGood.bind(this)}>

              <tr>
                {this.state.massCell[0]}
            </tr>
            <tr>
                {this.state.massCell[1]}
            </tr>
            <tr>
                {this.state.massCell[2]}
            </tr>
            <tr>
                {this.state.massCell[3]}
            </tr>
            <tr>
                {this.state.massCell[4]}
            </tr>

             
                </table>
                {this.state.isgood ? <div onClick={this.handleContinue} className="gods">НАЖМИТЕ ЧТОБЫ ПРОДОЛЖИТЬ...</div> : null}
            </div>
        );
    }
}

export default Tgame;
