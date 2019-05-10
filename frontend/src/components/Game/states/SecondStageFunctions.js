import {smartSetHeight, smartSetWidth} from '../utils';
const SSF = {

    imageCheck: function(mass){
        let trueMass = mass.filter(function(number) {
            return number.angle == 0;
          });
        
        return trueMass.length == mass.length;
    }, 

    makeImageDrop: function(x, y, filename, first, second, third, fourth, type){
        let addImg = this.game.add.image(x, y, filename);
        addImg.first = first;
        addImg.second = second;
        addImg.third = third;
        addImg.fourth = fourth;
        addImg.type = type;

        return addImg;
    },

    //general
    addNote: function(x, y, size) {
        let graphics = this.game.add.graphics(0, 0);
        graphics.lineStyle(2, 0xFFFFFF, 1);
        graphics.beginFill(0xFFFFFF, 1);
        this.rectOne = graphics.drawRect(0, 0, 2000, 2000);
        graphics.endFill();

        this.notebook = this.game.add.image(x, y, 'cloud'/*'notebook'*/);
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

export default SSF;