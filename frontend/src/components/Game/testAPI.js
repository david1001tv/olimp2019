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
        this.bad.length = 0;
    },

    checkAnswers: function(obj) {
        if(obj.todoId !== undefined){
            this.game.phone.completeTodo(obj.todoId);
        }
        if(this.flag === false) {
            if(obj.isHalf === true){
                this.grade += 25;
            }
            if(obj.isRight === true){
                this.grade += 25;
            }
            this.next();
        }
        else {
            if(obj.isRight === false) {
                let bad = this.game.add.image(obj.coord_x, obj.coord_y, 'bad');
                smartSetHeight(bad, 30);
                this.bad.push(bad);
                if(obj.check === false) {
                    obj.check = true;
                }
            }
            else {
                if(this.bad.length == 0) this.grade += 12.5;
                else this.grade += (12.5 - 3.125 * this.bad.length);
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

    addText: function(str, posX, posY, fontSize, todoId){
        let tmp = this.game.add.text(posX, posY, str, {
                font: fontSize+"px Pangolin",
        });
        if(todoId !== undefined){
            tmp.todoId = todoId;
        }
        return tmp;
    },

    deleteText: function(objQuestion, objAnswers) {
        if(objQuestion !== null) objQuestion.destroy();
        objAnswers.forEach(e => {
            e.destroy();
        });
    }
}

export default testAPI;