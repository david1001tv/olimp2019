import Phaser from 'phaser';
import {smartSetHeight, smartSetWidth} from '../../utils';
import todos from '../../todos/Scanner';
import SSF from '../../states/SecondStageFunctions';

const INACTIVE_Y = 940;


export default class Scanner extends Phaser.State {
    * gen() {
        this.game.input.enabled = false;
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.displayDialogLine('Голос', 'Сьогодні всі, хто стояли біля кафедри, обговорювали майбутню наукову конференцію. Ви ще не вирішили, чи будете брати участь, але мимоволі прислухалися до розмов. Хтось запитав за необхідність наукової роботи у Вашого куратора', () => this.next());
        yield;

        this.game.add.tween(this.teacher).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start(); 
        this.game.displayDialogLine('Тарас Денисович', 'Кожен з Вас може брати участь у науковому житті кафедри. Необхідність виконання наукової роботи полягає у знайомстві з сучасними розробками, досягненнями науки, в опануванні новітніх технологій, не передбачених освітньою програмою', () => this.next());
        yield;
        this.game.displayDialogLine('Тарас Денисович', 'Наука розширює кругозір. Ваші знання поглиблюються, так як під час наукової діяльності Ви обов\'язково стикаєтесь з новими областями знань', () => this.next());
        yield;
        this.game.displayDialogLine('Тарас Денисович', 'Стає цікавіше вчитися, більше стимулів до цього і, звичайно, більше можливостей в житті. Наукова робота допоможе, наприклад, під час вступу до аспірантури, на роботу', () => this.next());
        yield;
        this.game.displayDialogLine('Тарас Денисович', 'Загалом, це сприяє "органічному" і всебічному розвитку особистості людини - майбутнього фахівця', () => this.next());
        yield;

        this.buttonApprove_on.inputEnabled = true;
        this.buttonApprove_on.alpha = 1;
        this.selectFirst.alpha = 1;
        
        this.buttonDisapprove_on.inputEnabled = true;
        this.buttonDisapprove_on.alpha = 1;
        this.selectSecond.alpha = 1;

        //Повідомлення "Цей вибір вплине на Вашу історію"
        this.game.add.tween(this.warning).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.add.tween(this.firstWarning).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        yield;

        this.game.add.tween(this.warning).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.add.tween(this.firstWarning).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.add.tween(this.teacher).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start(); 

        if (this.firstChoice == 'Approved'){
            this.game.add.tween(this.bg2).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start();

            this.game.displayDialogLine('Голос', 'Зібравшись з силами, Ви взялися до виконання наукової роботи. Варто добре поміркувати, яких порад дотримуватися під час написання', () => this.next());
            yield;

            this.game.add.tween(this.warning).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start().onComplete.add(() => {
                    setTimeout(() => {
                        this.game.add.tween(this.warning).to({
                            alpha: 0
                        }, 1500, Phaser.Easing.Cubic.InOut)
                            .start();
                    }, 3000);   
            });

            this.game.add.tween(this.secondWarning).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start().onComplete.add(() => {
                    setTimeout(() => {
                        this.game.add.tween(this.secondWarning).to({
                            alpha: 0
                        }, 1500, Phaser.Easing.Cubic.InOut)
                            .start();
                    }, 3000);   
            });

            let alphaBlur = 2;
            this.cards.forEach((index) => {
                if (alphaBlur % 2 == 0){
                    this.game.add.tween(index).to({
                        alpha: 1
                    }, 1500, Phaser.Easing.Cubic.InOut)
                        .start(); 
                }
                else {
                    this.game.add.tween(index).to({
                        alpha: 0.9
                    }, 1500, Phaser.Easing.Cubic.InOut)
                        .start(); 
                }
                alphaBlur++;
            });

            //Зона ответов
            this.game.add.tween(this.areaYes).to({
                alpha: 0.4
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start(); 
            this.game.add.tween(this.areaNo).to({
                alpha: 0.4
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start(); 

            this.game.add.tween(this.answerYes).to({
                alpha: 0.5
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start(); 
            
            this.game.add.tween(this.answerNo).to({
                alpha: 0.5
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start(); 

            this.cards[16].inputEnabled = true;
            this.cards[16].input.useHandCursor = true;
            this.cards[16].input.pixelPerfectOver = true;
            this.cards[16].input.enableDrag(false, true, true, 1);
            this.activePart = this.cards[16];
            //this.cards[16].events.onDragStart.add(this.handleDragStart, this);
            this.cards[16].events.onDragStop.add(this.handleCheck, this, 0,  this.cards[16].first,  this.cards[16].second,  this.cards[16].third,  this.cards[16].fourth);

            this.stage.disableVisibilityChange = true;

            this.game.input.enabled = true;
            this.game.phone.setEnabled(true);
            yield;

            this.game.displayDialogLine('Голос', 'Зі своєю роботою Ви виступили на науковій конференції, де вас зустріли скептично налаштовані фахівці. Вони задавали Вам незручні питання, а Ви переконували їх у своїй правоті, що допомогло поглянути на проблему під іншим кутом', () => this.next());

            this.game.add.tween(this.answerYes).to({
                alpha: 0
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start();

            this.game.add.tween(this.answerNo).to({
                alpha: 0
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start();

            this.game.add.tween(this.areaYes).to({
                alpha: 0
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start();

            this.game.add.tween(this.areaNo).to({
                alpha: 0
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start();
        
            this.game.add.tween(this.warning).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start().onComplete.add(() => {
                    setTimeout(() => {
                        this.game.add.tween(this.warning).to({
                            alpha: 0
                        }, 1500, Phaser.Easing.Cubic.InOut)
                            .start();
                    }, 3000);   
            });

            this.game.add.tween(this.thirdWarning).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start().onComplete.add(() => {
                    setTimeout(() => {
                        this.game.add.tween(this.thirdWarning).to({
                            alpha: 0
                        }, 1500, Phaser.Easing.Cubic.InOut)
                            .start();
                    }, 3000);   
            });
            yield;
            
        }
        else {
            this.game.displayDialogLine('Ви', 'На жаль, мені бракує часу на глибоке вивчення сучасної технології. Тож якось іншим разом, коли будуть сили, натхнення і бажання', () => this.next());
            yield;
        }

        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.nextState(this.score);
    }

    init() {
        this.activePart = null;
        this.isRight = false;

        this._gen = this.gen();

        this.game.phone.clearTodos();
        this.game.phone.addTodos(todos);
        this.game.phone.setEnabled(false);
        this.game.phone.setTime('14:07');
        this.game.phone.setDate('02.07.18');

        this.firstChoice = null;
    }

    preload() {

        this.load.image('bg', './assets/images/2-6 (Cards)/background.png');
        this.load.image('bg2', './assets/images/2-6 (Cards)/background_2.png');
        this.load.image('no', './assets/images/2-6 (Cards)/no.png');
        this.load.image('yes', './assets/images/2-6 (Cards)/yes.png');

        for (let i = 0; i < 9; i++){
            this.load.image('card' + i, './assets/images/2-6 (Cards)/card' + i + '.png');
        }
        this.load.image('blur_card', './assets/images/2-6 (Cards)/blur.png');

        this.load.spritesheet('button_red_on', './assets/images/2-6 (Cards)/Button_Choice_On_Blue.png', 610, 122);
        this.load.spritesheet('button_blue_on', './assets/images/2-6 (Cards)/Button_Choice_On_Blue.png', 610, 122);

        this.load.image('teacher', './assets/images/2-6 (Cards)/teacher.png');
        this.load.image('warning_message', './assets/images/2-6 (Cards)/warning_message.png');

    }

    create() {
        this.SSF = {...SSF};
        for (let key in this.SSF) {
            this.SSF[key] = this.SSF[key].bind(this);
        }

        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        let bg2 = this.game.add.image(0, 0, 'bg2');
        bg2.height = this.game.width * bg2.height / bg2.width;
        bg2.width = this.game.width;
        bg2.alpha = 0;
        this.bg2 = bg2;


        //Выбор
        let buttonApprove_on = this.game.add.button(656, 300, 'button_blue_on', this.firstSelection, this, 1, 1, 0);
        buttonApprove_on.inputEnabled = false;
        buttonApprove_on.alpha = 0;
        this.buttonApprove_on = buttonApprove_on;

        let buttonDisapprove_on = this.game.add.button(656, 650, 'button_red_on', this.firstSelection, this, 1, 1, 0);
        buttonDisapprove_on.inputEnabled = false;
        buttonDisapprove_on.alpha = 0;
        this.buttonDisapprove_on = buttonDisapprove_on;

        this.selectFirst = this.game.add.text(690, 335, 'Прийняти участь у науковому житті', {
            font: "Leftonade",
            fontSize: 35,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.selectFirst.alpha = 0; 

        this.selectSecond = this.game.add.text(720, 675, 'Мені це не потрібно', {
            font: "Leftonade",
            fontSize: 55,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.selectSecond.alpha = 0;

        let areaYes = this.game.add.image(1470, 0, 'yes');
        areaYes.alpha = 0;
        this.areaYes = areaYes;

        let areaNo = this.game.add.image(0, 0, 'no');
        areaNo.alpha = 0;
        this.areaNo = areaNo;

        //Надпис "Так"
        this.answerYes = this.game.add.text(1575, 440, 'Так', {
            font: "Leftonade",
            fontSize: 150,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.answerYes.alpha = 0; 

        //Надпис "Нi"
        this.answerNo = this.game.add.text(150, 440, 'Нi', {
            font: "Leftonade",
            fontSize: 150,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.answerNo.alpha = 0; 

        this.teacher = this.SSF.makeImg(1250, 50, 'teacher', 700, 900);

        this.cards = [];
        this.count_back = 8;
        //this.cardsIsRight = [true, true, false, true, true, false, false, false, true];
        this.cardsIsRight = [true, false, false, false, true, true, false, true, true]; //ответы в обратном порядке
        let addx = 5;
        let addy = 3;
        for (let i = 0; i < 9; i++){
            console.log(this.cardsIsRight[i]);
            if (this.cardsIsRight[i]){
                this.cards.push(this.SSF.makeImageDrop(660 + addx, 95 + addy, 'card' + this.count_back , 1300, -100, 2000, 2000));
            }
            else {
                this.cards.push(this.SSF.makeImageDrop(650 + addx, 100 + addy, 'card' + this.count_back , -1380, -100, 2000, 2080));
            } 
            if (i < 8) this.cards.push(this.SSF.makeImageDrop(655 + addx, 100 + addy, 'blur_card'));
            this.count_back--;
            addx += 5;
            addy += 3;
        }
        
        //Уведомления
        let warning = this.game.add.image(700, 0, 'warning_message');
        warning.alpha = 0;
        smartSetHeight(warning, 200);
        this.warning = warning;

        this.firstWarning = this.game.add.text(735, 80, 'Цей вибір вплине на Вашу історію', {
            font: "Leftonade",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.firstWarning.alpha = 0;

        this.secondWarning = this.game.add.text(735, 40, 'Картки з вірними порадами\nперетягніть до зеленої області,\nз невірними - до червоної', {
            font: "Leftonade",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.secondWarning.alpha = 0;

        this.thirdWarning = this.game.add.text(720, 60, 'Вітаємо! Ви отримали новий\nдосвід і завели корисні знайомства!', {
            font: "Leftonade",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.thirdWarning.alpha = 0;

        this.next();
    }

    handleCheck(currImg, currPointer, first, second, third, fourth){

        console.log(first, second, third, fourth);
        //console.log(this.activePart.x, this.activePart.y);


        if (!this.isRight){
            this.game.input.enabled = false;

            let scannerRectangle = new Phaser.Rectangle(first, second, third, fourth);

            const {activePart} = this;

            if (this.activePart !== null) {
                if (Phaser.Rectangle.containsRect(activePart.getBounds(), scannerRectangle)) {
                    activePart.isRight = true;

                    let index = this.cards.indexOf(activePart) - 2;
                    if(index >= 0){
                        this.cards[index].inputEnabled = true;
                        this.cards[index].input.useHandCursor = true;
                        this.cards[index].input.pixelPerfectOver = true;
                        this.cards[index].input.enableDrag(false, true, true, 1);
                        this.cards[index].events.onDragStop.add(this.handleCheck, this, 0, this.cards[index].first, this.cards[index].second, this.cards[index].third, this.cards[index].fourth);
                    }

                    activePart.destroy();
                    let index2 = this.cards.indexOf(activePart) - 1;
                    if(index >= 0){
                    this.cards[index2].isRight = true;
                    this.cards[index2].destroy();
                    }

                    this.game.displayDialogLine('Голос', 'Добре! Ви рушите вірним шляхом');
                    this.game.phone.completeTodo(activePart.todoId);

                    this.activePart = this.cards[index];
                } else {
                    this.game.displayDialogLine('Ви', 'О ні! Це була жорстока помилка');
                }
            }

            if (this.cards.every(e => e.isRight)) {
                // if (this.count === 5) {
                //     this.score = 100;
                // }
                // else if (this.count <= 9) {
                //     this.score = Math.round(40 / (this.count - 5)) + 50;
                // }
                // else {
                //     this.score = 50;
                // }
                this.next();
            }
        }
    }

    firstSelection(obj) {
        if (obj.key == 'button_blue_on'){
            this.firstChoice = 'Approved';
        }
        else {
            this.firstChoice = 'Disapproved';
        }

        this.buttonApprove_on.destroy();
        this.buttonDisapprove_on.destroy();
        this.selectFirst.destroy();
        this.selectSecond.destroy();
        this.next();
    }

    next() {
        this._gen.next();
    }
}
