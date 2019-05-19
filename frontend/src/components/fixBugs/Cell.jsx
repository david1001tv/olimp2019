import React, {Component} from 'react';
 
class Cell extends Component {
    
    state = {
        bug: '',
        no_bug: '',
    }

    constructor(props) {
        super(props);
        this.bColor = props.bColor;
        this.dataRow = props.dataRow;
        this.dataColumn = props.dataColumn;
        console.log(props.dataProf)

        this.styleTd = {
            border: "1px solid black",
			textAlign: "center",
            backgroundColor: "red",
            backgroundImage: `url(${this.state.bug})`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `100%`
        }
        if(this.bColor != undefined){
            this.styleTd. backgroundColor = this.bColor;
            this.styleTd.backgroundImage = `url(${this.state.no_bug})`;
        }
        //this.dataProf = props.dataProf;
    }

    componentWillMount() {
        if (this.dataProf === 'prog'){
            this.setState({bug: './fixbug/programmer/bug.png', no_bug: './fixbug/programmer/no_bug.png'});
        }    
        else if (this.dataProf === 'net'){
            this.setState({bug: './fixbug/devops/bug.png', no_bug: './fixbug/devops/no_bug.png'});
        } 
        else {
            this.setState({bug: './fixbug/designer/bug.png', no_bug: './fixbug/designer/no_bug.png'});
        }
    }

    highlight(){
       
        let g1 = document.querySelector('[data-row="' + (this.dataRow - 1) + '"][data-column="' + this.dataColumn + '"]');
        if(g1 != null){
            if(g1.style.backgroundColor == "blue"){
                g1.style.backgroundColor = "red";
                g1.style.backgroundImage = `url(${this.state.bug})`;
            }else{
                g1.style.backgroundColor = "blue";
                g1.style.backgroundImage = `url(${this.state.no_bug})`;
            }
        }
        
        let g2 = document.querySelector('[data-row="' + (this.dataRow + 1) + '"][data-column="' + this.dataColumn + '"]');
        if(g2 != null){
            if(g2.style.backgroundColor == "blue"){
                g2.style.backgroundColor = "red";
                g2.style.backgroundImage = `url(${this.state.bug})`;
            }else{
                g2.style.backgroundColor = "blue";
                g2.style.backgroundImage = `url(${this.state.no_bug})`;
            }
        }

        let g3 = document.querySelector('[data-row="' + (this.dataRow) + '"][data-column="' + (this.dataColumn - 1) + '"]');
        if(g3 != null){
            if(g3.style.backgroundColor == "blue"){
                g3.style.backgroundColor = "red";
                g3.style.backgroundImage = `url(${this.state.bug})`;
            }else{
                g3.style.backgroundColor = "blue";
                g3.style.backgroundImage = `url(${this.state.no_bug})`;
            }
        }

        let g4 = document.querySelector('[data-row="' + (this.dataRow) + '"][data-column="' + (this.dataColumn + 1) + '"]');
        if(g4 != null){
            if(g4.style.backgroundColor == "blue"){
                g4.style.backgroundColor = "red";
                g4.style.backgroundImage = `url(${this.state.bug})`;
            }else{
                g4.style.backgroundColor = "blue";
                g4.style.backgroundImage = `url(${this.state.no_bug})`;
            }
        }

        let g5 = document.querySelector('[data-row="' + (this.dataRow) + '"][data-column="' + (this.dataColumn) + '"]');
        if(g5.style.backgroundColor == "blue"){
            g5.style.backgroundColor = "red";
            g5.style.backgroundImage = `url(${this.state.bug})`;
        }else{
            g5.style.backgroundColor = "blue";
            g5.style.backgroundImage = `url(${this.state.no_bug})`;
        }
    }
// 
  
 
    render() {

        console.log(this.state.bug)
        
       return (
           
                <td onClick={ this.highlight.bind(this)} data-row={this.dataRow} data-column={this.dataColumn} style={this.state.styleTd}></td>
           
        );
    }
}

export default Cell;
