//Используется в WaterMarket.js и Translate.js
import {smartSetHeight} from './utils';
const testAPI = {

    addNote: function(x, y, size) {
        let graphics = this.game.add.graphics(0, 0);
        graphics.lineStyle(2, 0xFFFFFF, 1);
        graphics.beginFill(0xFFFFFF, 1);
        this.rectOne = graphics.drawRect(0, 0, 2000, 2000);
        graphics.endFill();

        this.notebook = this.game.add.image(x, y, 'notebook');
        smartSetHeight(this.notebook, size);
        return graphics;
    },

    displayNote: function(x, y) {
        this.rectOne.alpha = x;
        this.notebook.alpha = y;
    },

    destroyNote: function() {
        this.notebook.destroy();
        this.rectOne.destroy();
    },

    destroyIncorrect: function() {
        this.bad.forEach(e => e.destroy());
    },
    
    checkAnswers: function(obj) {
        if(this.flag === false) {
            if(obj.isHalf === true){
                this.grade += 50;
            }
            if(obj.isRight === true){
                this.grade += 50;
            }
            this.next();
        }
        else {
            if(obj.isRight === false) {
                let bad = this.game.add.image(obj.coord_x, obj.coord_y, 'bad');
                smartSetHeight(bad, 30);
                this.bad.push(bad);
                if(obj.check === false) {
                    this.grade -= 50;
                    obj.check = true;
                }
            }
            else {
                this.grade += 50;
                this.next();
            }
        }
    },

    addCheck: function(obj){
        obj.forEach(e => {
            e.inputEnabled = true;
            e.events.onInputDown.add(testAPI.checkAnswers, this);
            e.input.useHandCursor = true;
        });
    },

    addText: function(str, posX, posY, fontSize){
        let tmp = this.game.add.text(posX, posY, str, {
                font: fontSize+"px Pangolin",
        });
        return tmp;
    },

    deleteText: function(objQuestion, objAnswers){
        if(objQuestion !== null) objQuestion.destroy();
        objAnswers.forEach(e => {
            e.destroy();
        });
    }
}

export default testAPI;