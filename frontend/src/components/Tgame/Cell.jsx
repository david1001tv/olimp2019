import React, {Component} from 'react';

 
class Cell extends Component {
    
    state = {
        styleTd: {
            border: "1px solid black",
			textAlign: "center",
            backgroundColor: "blue"
        }
    }

    constructor(props) {
        super(props);
        this.bColor = props.bColor;
        this.dataRow = props.dataRow;
        this.dataColumn = props.dataColumn;
        this.text = props.text;
        if(this.bColor != undefined){
            this.state.styleTd.backgroundColor = this.bColor;
        }
        if(props.isShow != undefined){
            this.state.trIsShow = true;
        }
        
    }

    highlight(){
       
        let g1 = document.querySelector('[data-row="' + (this.dataRow - 1) + '"][data-column="' + this.dataColumn + '"]');
        if(g1 != null){
            g1.style.backgroundColor == "blue" ? g1.style.backgroundColor = "red" : g1.style.backgroundColor = "blue";
        }
        
        let g2 = document.querySelector('[data-row="' + (this.dataRow + 1) + '"][data-column="' + this.dataColumn + '"]');
        if(g2 != null){
            g2.style.backgroundColor == "blue" ? g2.style.backgroundColor = "red" : g2.style.backgroundColor = "blue";
        }

        let g3 = document.querySelector('[data-row="' + (this.dataRow) + '"][data-column="' + (this.dataColumn - 1) + '"]');
        if(g3 != null){
            g3.style.backgroundColor == "blue" ? g3.style.backgroundColor = "red" : g3.style.backgroundColor = "blue";
        }

        let g4 = document.querySelector('[data-row="' + (this.dataRow) + '"][data-column="' + (this.dataColumn + 1) + '"]');
        if(g4 != null){
            g4.style.backgroundColor == "blue" ? g4.style.backgroundColor = "red" : g4.style.backgroundColor = "blue";
        }

        let g5 = document.querySelector('[data-row="' + (this.dataRow) + '"][data-column="' + (this.dataColumn) + '"]');
        g5.style.backgroundColor == "blue" ? g5.style.backgroundColor = "red" : g5.style.backgroundColor = "blue";

    }
// 
  
 
    render() {
        
       return (
           
                <td onClick={ this.highlight.bind(this)} data-row={this.dataRow} data-column={this.dataColumn} style={this.state.styleTd}>{this.text}</td>
           
        );
    }
}

export default Cell;
