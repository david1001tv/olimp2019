// Используется в WaterMarket.js и Translate.js
import { smartSetHeight } from './utils';

const testAPI = {

    addNote: function (x, y, size) {
        let graphics = this.game.add.graphics(0, 0);
        graphics.lineStyle(2, 0xFFFFFF, 1);
        graphics.beginFill(0xFFFFFF, 1);
        this.rectOne = graphics.drawRect(0, 0, 2000, 2000);
        graphics.endFill();

        this.notebook = this.game.add.image(x, y, 'notebook');
        smartSetHeight(this.notebook, size);
        return graphics;
    },

    displayNote: function (x, y) {
        this.rectOne.alpha = x;
        this.notebook.alpha = y;
    },

    destroyNote: function () {
        this.notebook.destroy();
        this.rectOne.destroy();
    },

    destroyIncorrect: function () {
        this.bad.forEach(e => e.destroy());
        this.bad.length = 0;
    },

    checkAnswers: function (obj) {
        if (obj.todoId !== undefined) {
            this.game.phone.completeTodo(obj.todoId);
        }
        if (this.flag === false) {
            if (obj.isHalf === true) {
                this.grade += 25;
            }
            if (obj.isRight === true) {
                this.grade += 25;
            }
            this.next();
        } else {
            if (obj.isRight === false) {
                let bad = this.game.add.image(obj.coord_x, obj.coord_y, 'bad');
                smartSetHeight(bad, 30);
                this.bad.push(bad);
                if (obj.check === false) {
                    obj.check = true;
                }
            } else {
                if (this.bad.length === 0) this.grade += 12.5;
                else this.grade += (12.5 - 3.125 * this.bad.length);
                this.next();
            }
        }
    },

    addCheck: function (obj) {
        obj.forEach(e => {
            e.inputEnabled = true;
            e.events.onInputDown.add(testAPI.checkAnswers, this);
            e.input.useHandCursor = true;
        });
    },

    addText: function (str, posX, posY, fontSize, todoId) {
        let tmp = this.game.add.text(posX, posY, str, {
            font: fontSize + "px Pangolin",
        });
        if (todoId !== undefined) {
            tmp.todoId = todoId;
        }
        return tmp;
    },

    deleteText: function (objQuestion, objAnswers) {
        if (objQuestion !== null) objQuestion.destroy();
        objAnswers.then(arr => {
            arr.forEach(e => {
                e.destroy();
            });
        });
    },

    makeAnswer:function(text, x,y,size, bad_x, isRight, check, addText){
        let answer = addText(text,x,y,size);
        answer.isRight = isRight;
        answer.coord_x = bad_x;
        answer.coord_y = y;
        answer.check = check;
        return answer;
    },

    getMasAnswer:function(text, is_Right, makeAnswer, addText){
        let firstAnswer = makeAnswer(text[0], 60,600,24, 15, is_Right[0], false,addText);
        let secondAnswer = makeAnswer(text[1], 60,640,24, 15, is_Right[1], false,addText);
        let thirdAnswer = makeAnswer(text[2], 60,680,24, 15, is_Right[2], false,addText);
        let fourthAnswer = makeAnswer(text[3], 60,720,24, 15, is_Right[3], false,addText);
        return [firstAnswer, secondAnswer, thirdAnswer, fourthAnswer];
    },

    oneTask: function (slide, cloud, teacherText, answersText, answersIsRight, addText, makeAnswer, getMasAnswer, addCheck) {
        let dialogAuthor;
        let dialogText;
        let answers;
        return new Promise((resolve, reject) => {
            this.game.add.tween(slide).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start().onComplete.add(() => {
                dialogAuthor = addText("Преподаватель", 140, 900, 24);
                dialogText = addText(teacherText, 140, 950, 24);
                this.game.add.tween(cloud).to({
                    alpha: 1
                }, 1500, Phaser.Easing.Cubic.InOut)
                    .start().onComplete.add(() => {
                        answers = getMasAnswer(
                            answersText,
                            answersIsRight,
                            makeAnswer, addText);
                        addCheck(answers);
                        resolve([dialogAuthor, dialogText].concat(answers));
                    });
            });
        });
    },
};

export default testAPI;
