import {smartSetHeight, smartSetWidth} from '../utils';
const FSF = {

    makeImg: function(x,y,img,w,h){
        let slide = this.game.add.image(x,y,img);
        slide.alpha = 0;
        smartSetHeight(slide, h);
        smartSetWidth(slide, w);
        return slide;
    },

    makeAnswer: function(text, x,y,size, bad_x, isRight, check, addText){
    let answer = addText(text,x,y,size);
    answer.isRight = isRight;
    answer.coord_x = bad_x;
    answer.coord_y = y;
    answer.check = check;
    return answer;
    },

    getMasAnswer: function(text, is_Right, makeAnswer, addText){
        let firstAnswer = makeAnswer(text[0], 60,600,24, 15, is_Right[0], false,addText);
        let secondAnswer = makeAnswer(text[1], 60,640,24, 15, is_Right[1], false,addText);
        let thirdAnswer = makeAnswer(text[2], 60,680,24, 15, is_Right[2], false,addText);
        let fourthAnswer = makeAnswer(text[3], 60,720,24, 15, is_Right[3], false,addText);
        return [firstAnswer, secondAnswer, thirdAnswer, fourthAnswer];
    },


    setTextAlpha: function(obj1,obj2,obj3,alpha){
        obj1.alpha = alpha;
        obj2.alpha = alpha;
        obj3.forEach((obj)=>{obj.alpha = alpha; });
    },

    oneTask: function(slide, cloud, teacher_text, answers_text, answers_is_right, 
        addText,makeAnswer,getMasAnswer,addCheck, setTextAlpha){
        let dialog_author,dialog_text,answers;
        dialog_author=addText("Преподаватель", 140, 900, 24);
        dialog_text=addText(teacher_text, 140, 950, 24);
        answers = getMasAnswer(
            answers_text, 
            answers_is_right, 
            makeAnswer, addText);  
        setTextAlpha(dialog_author,dialog_text,answers,false);

        this.game.add.tween(slide).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut).start().onComplete.add(() => {
          this.game.add.tween(cloud).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut).start();
        });
                 
        addCheck(answers);
        setTimeout(()=>{setTextAlpha(dialog_author,dialog_text,answers,true);}, 2500);
        return [dialog_author,dialog_text,answers];
    },

    deleteTask: function(destroyIncorrect,deleteText,oneTask,cloud){
        destroyIncorrect();
        deleteText(null, [oneTask[0],oneTask[1]].concat(oneTask[2]));
        cloud.alpha=0;
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
            e.events.onInputDown.add(FSF.checkAnswers, this);
            e.input.useHandCursor = true;
        });
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

export default FSF;