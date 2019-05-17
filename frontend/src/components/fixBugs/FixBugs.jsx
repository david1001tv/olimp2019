import React, {Component} from 'react';
import bug from '../../img/fixbug/bug.png';
import no_bug from '../../img/fixbug/no_bug.png';
import Cell from './Cell';
import './tgame.sass';

import PubSub from 'pubsub-js';
 
class FixBugs extends Component {
    
    state = {
        massCell: [
            [],
            [],
            [],
            [],
            []
        ],
        isgood: false,
        isVisible: true
    }

    constructor(props) {
       super(props); 
       


       for(let i = 0; i < 5; i++){
           for(let j = 0; j < 5; j++){
               if(j === 2 && i === 2){
                this.state.massCell[i].push( <Cell dataRow={i} dataColumn={j} bColor = {"blue"} /> );
               }else{
                this.state.massCell[i].push( <Cell dataRow={i} dataColumn={j} /> );
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
           if(value.style.backgroundColor == "blue"){
            ++good;
           }
        });
       // console.log(good);
        if(good == 25){
            console.log(good);
            this.setState({isVisible: true });
            setTimeout(() => PubSub.publish('goNext', 'yes'), 500);

            this.setState({isgood: true });
            document.querySelector("table").addEventListener("click", (e) => {
                e.stopPropagation();
                
            });
        }
        setTimeout(() => PubSub.publish('goMist', 'yes'), 10);
    }

 
    render() {

        if(this.state.isVisible){
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
                   
                </div>
            );
        }
        return(
                <div></div>
        );

    }
}

export default FixBugs;
