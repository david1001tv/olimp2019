import Phaser from 'phaser';
import {smartSetHeight} from '../../utils';
import SSF from '../../states/SecondStageFunctions';
 
const ARROWS_BOTTOM = 950;
 
let checkI = false;

const LEFT_ARROW = 0;
 
const RIGHT_ARROW = 3;

let globT = 0;
let globid = 0;
let checkid = 0;
let strAll = "";


export default class Scanner extends Phaser.State {
    async * gen() {
        this.game.input.enabled = true;
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.displayDialogLine('Голос', 'До отримання диплома магістра залишилося здати останній предмет, який насправді найскладніший з усіх. Суттю даного предмета є вивчення та розробка штучного інтелекту, але як можна навчити думати "залізяку"?', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Сподіваюсь Адам Вікторович мені в цьому допоможе...', () => this.next());
        yield;

        this.game.add.tween(this.teacher).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.add.tween(this.bg).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.displayDialogLine('Адам Вікторович', 'Доброго ранку, на кону стоїть ваш диплом магістра і сьогодні Ви повинні впоратися з цим завданням. На практиці вам доведеться дізнатися що хоче сказати вам робот', () => this.next());
        yield;

        this.game.displayDialogLine('Адам Вікторович', 'На жаль у нього є пару багів, через що він іноді генерує випадкові слова, які вам необхідно визначити і усунути. Дізнатися вірно, чи ні ви визначили зайві слова ви зможете по очах робота', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Коли Ви запитали Адама Вікторовича про те, як все це робити, він подивився на вас переляканими очима і негайно пішов з кабінету. Ну що ж доведеться думати самотужки', () => this.next());
        yield;

        this.game.add.tween(this.teacher).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        let fullDavid = this.createDavid();
        this.game.add.tween(fullDavid).to({alpha: 1}, 3000).start().onComplete.add(() => this.next());
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

        this.game.add.tween(this.firstWarning).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => {
                setTimeout(() => {
                    this.game.add.tween(this.firstWarning).to({
                        alpha: 0
                    }, 1500, Phaser.Easing.Cubic.InOut)
                        .start();
                }, 3000);   
        });

        this.game.displayDialogLine('Голос ', 'Поїхали', () => this.next());
        yield;

        // 3.. 2.. 1...
        this.startCountdown();
        setTimeout(() => this.next(), 4000);
  
        yield;
        this.createCursors();
        this.sendArrow();
        yield;
        
        // в переменной this.porc храниться результат 

        if (this.porc > 80){
            this.game.displayDialogLine('Ви', 'Готово, вийшло просто відмінно, цей шматок заліза виявляється може і таке ... здається мені, що скоро почнеться повстання машин ...', () => this.next());
        }
        else {
            this.game.displayDialogLine('Ви', 'Вішло не дуже, але принаймні це працює. Повстання машин настане точно не скоро ...', () => this.next());
        }
        yield;

        this.game.displayDialogLine('Голос ', '*Звідки не візьмись перед вами з\'явився Адам Вікторович*', () => this.next());
        yield;
        
        let bg3 = this.game.add.image(0, 0, 'bg3');
        bg3.height = this.game.width * bg3.height / bg3.width;
        bg3.width = this.game.width;
        bg3.alpha = 0;
        this.bg3 = bg3;

        this.teacher2 = this.SSF.makeImg(1260, 50, 'teacher', 700, 900);

        this.game.add.tween(this.teacher2).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.textA).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(fullDavid).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.bg3).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.displayDialogLine('Адам Вікторович', 'Дуже добре, я знав що Ви впораєтеся. Зустрінемося завтра на врученні дипломів', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Я так запрацювався, що й забув про те, що вранці говорив нам Адам Вікторович, завтра вже вручення диплома. Цікаво, чи зможу я отримати червоний?', () => this.next());
        yield;

        this.game.displayDialogLine('Адам Вікторович', 'Ну все, йди відпочивай, в мене тут ще є пару справ', () => this.next());
        yield;

        this.game.camera.fade(0x000000, 2500, true);
        setTimeout(() => this.next(), 2500);
        yield;

        this.cleanUpCursors();

        
        if (this.proc >= 90){
            this.score = 100;
        }
        else if (this.proc >= 74){
            this.score = 50;
        }
        else {
            this.score = 10; 
        }
        
        this.game.nextState(this.score);
    }

    constructor() {
        super();

        this.score = 50;
    }

    init() {
        this.activeDocument = null;
        this._gen = this.gen();
        this.game.phone.setEnabled(true);
    }

    preload() {
        this.load.image('bg', './assets/images/2-9 (Robot)/fon.png');
        this.load.image('bg2', './assets/images/2-9 (Robot)/background2.png');
        this.load.image('bg3', './assets/images/2-9 (Robot)/background2.png');
        this.load.image('teacher', './assets/images/2-9 (Robot)/teacher.png');

        this.load.image('warning_message', './assets/images/3-1 (Labyrinth)/warning_message.png');

        this.load.image('d-shadow', './assets/images/2-9 (Robot)/robot.png');
        this.load.image('robot-rot', './assets/images/2-9 (Robot)/robot_rot.png');
        this.load.image('blue-eyes', './assets/images/2-9 (Robot)/blue.png');
        this.load.image('green-eyes', './assets/images/2-9 (Robot)/green.png');
        this.load.image('red-eyes', './assets/images/2-9 (Robot)/red.png');

        this.load.image('cloud', './assets/images/2-9 (Robot)/cloud1.png');

        this.load.image('left', './assets/images/2-9 (Robot)/left.png');
        this.load.image('right', './assets/images/2-9 (Robot)/right.png');
    }
    
    create() {
        this.SSF = {...SSF};
        for (let key in this.SSF) {
            this.SSF[key] = this.SSF[key].bind(this);
        }

        let bg2 = this.game.add.image(0, 0, 'bg2');
        bg2.height = this.game.width * bg2.height / bg2.width;
        bg2.width = this.game.width;

        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;
        bg.alpha = 0;
        this.bg = bg;

        this.teacher = this.SSF.makeImg(1260, 50, 'teacher', 700, 900);
    
        this.activeArrows = [];
        this.porc = 0;

        this.allOne = 0;
        this.flag = true;
        this.massText = [
            "программирование", "это", " процесс", "превращения", "алгоритма", "в", "нотацию", "написанную", "на", "языке", "программирования", "которая", "может", "быть", "выполнена", "компьютером"
        ];
        this.massText3 = [
            "программирование", "это", " процесс", "превращения", "земля","алгоритма", "в","форточку", "нотацию", "написанную", "на", "журнал", "языке",  "программирования", "которая", "может", "быть","кирпич", "выполнена", "дом", "компьютером"
        ];
        this.checkedMass = [];

        this.next();
    }

    startCountdown() {
        let count = 3;
        let countdownText = this.game.add.text(this.world.centerX, this.world.centerY, count.toString(), {
            font: 'Leftonade',
            fontSize: 270,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 10,
        });
        let callback = () => {
            count--;
            if (count === 0) {
                countdownText.setText('Go!');
                setTimeout(() => countdownText.destroy(), 1000);
            }
            else {
                countdownText.setText(count.toString());
                setTimeout(callback, 1000)
            }
        };

        setTimeout(callback, 1000)
        countdownText.anchor.setTo(0.5, 0.5);
    }

    createCursors() {
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        this.cursors.left.onDown.add(e => this.handleKeyDown(LEFT_ARROW));
        this.cursors.right.onDown.add(e => this.handleKeyDown(RIGHT_ARROW));
    }

    cleanUpCursors() {
        this.cursors.left.onDown.removeAll();
        this.cursors.up.onDown.removeAll();
        this.cursors.down.onDown.removeAll();
        this.cursors.right.onDown.removeAll();

        this.cursors.left.onUp.removeAll();
        this.cursors.up.onUp.removeAll();
        this.cursors.down.onUp.removeAll();
        this.cursors.right.onUp.removeAll();

    }

    createDavid() {
        this.textA = this.game.add.text(1130, 620, "", {
            font: "Leftonade",
            fontSize: 34,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
            wordWrap: true,
            wordWrapWidth: 750,
        });
       
        let cloud = this.game.add.image(1054, 300, 'cloud');
        this.game.add.image(370, 150, 'left');
        this.game.add.image(870, 150, 'right');
        let robot = this.game.add.image(1200, 10, 'd-shadow');
        this.rot = this.game.add.sprite(1485, 260, 'robot-rot');
        
    
        this.eye = this.game.add.image(1454, 160, 'blue-eyes');
        this.redeye = this.game.add.image(1454, 160, 'red-eyes');
        this.redeye.alpha = 0;

        this.greeneye = this.game.add.image(1454, 160, 'green-eyes');
        this.greeneye.alpha = 0;
        
        let warning = this.game.add.image(700, 0, 'warning_message');
        warning.alpha = 0;
        smartSetHeight(warning, 200);
        this.warning = warning;

        this.firstWarning = this.game.add.text(735, 60, 'Управління здійснюється стрілками\nна клавіатурі : вiрно :  <- ; не вiрно:  ->', {
            font: "Leftonade",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.firstWarning.alpha = 0;

        // это не трогать, а то пахать перестает
        let fullDavid = this.game.add.group();
        fullDavid.addMultiple([this.textA, robot, this.rot, this.eye, this.redeye, this.greeneye, cloud]);
        fullDavid.alpha = 0;
        return fullDavid;
    }

    handleKeyDown(index) {
        // робот открывает рот 
        switch (index) {
            case LEFT_ARROW:
                
                this.animeRot();
                strAll += this.activeArrows[globid]._text + " ";
            
                if(this.activeArrows[globid]._text == this.massText[checkid]){
                    this.greeneye.alpha = 1;
                    if(this.flag) {
                        this.porc += 6.25;
                    }else{
                        this.flag =  true;
                    }
                    ++checkid;
                }else{
                    this.flag = false;
                    this.redeye.alpha = 1;
                    this.game.add.tween(this.redeye).to({alpha: 0}, 500).start().onComplete.add(()=>  this.redeye.alpha = 0);
                }
                this.checkedMass.push(this.activeArrows[globid]._text);
                this.activeArrows[globid].destroy();

                this.textA = this.game.add.text(1130, 575, strAll, {
                    font: "Leftonade",
                    fontSize: 30,
                    fill: 'white',
                    stroke: 'black',
                    strokeThickness: 8,
                    wordWrap: true,
                    wordWrapWidth: 750,
                });
                globid++;
                this.game.add.tween(this.greeneye).to({alpha: 0}, 500).start().onComplete.add(()=>  this.greeneye.alpha = 0);
                checkI = true;
                break;
            case RIGHT_ARROW:
                
                this.activeArrows[globid].destroy();
                if(this.activeArrows[globid]._text == this.massText[checkid]){
                    this.redeye.alpha = 1;
                    this.game.add.tween(this.redeye).to({alpha: 0}, 500).start().onComplete.add(()=>  this.redeye.alpha = 0);
                    ++checkid;
                }else{
                    this.greeneye.alpha = 1;
                    this.game.add.tween(this.greeneye).to({alpha: 0}, 500).start().onComplete.add(()=>  this.greeneye.alpha = 0);
                }
                globid++;
                checkI = true;
                break;
        }
       
         

    }

    generateArrow(text, index) {
        let arrow = this.game.add.text(700, ARROWS_BOTTOM, text,{
        font: 'Leftonade',
        fontSize: 70,
        fill: 'white',
        stroke: 'black',
        strokeThickness: 10,});
        arrow.anchor.setTo(0.5, 0.5);
        arrow.angle = 0;
        arrow.index = index;

        arrow.inputEnabled = true;
        return arrow;
    }

    sendArrow() {
        let arrow = this.generateArrow(this.massText3[globT++], globT);
        this.activeArrows.push(arrow);
        this.allOne = arrow;
        this.game.add.tween(arrow)
            .to({y: 140}, 2600) // время за которое текст пролетает
            .start()
            .onComplete
            .add((e) => {

                    strAll += "____" + " ";
                    this.textA = this.game.add.text(1130, 575, strAll, {
                        font: "Leftonade",
                        fontSize: 30,
                        fill: 'white',
                        stroke: 'black',
                        strokeThickness: 8,
                        wordWrap: true,
                        wordWrapWidth: 750,
                    });
               
               
                if(this.activeArrows[globid]._text == this.massText[checkid]){
                    ++checkid;
                   
                }
                if(!checkI){
                   
                    globid++; 
                    checkI = false;
                }else{
                   
                    globid++; 
                    checkI = false;
                }
                e.destroy();
            });
        
        if(globT <= this.massText3.length){
            setTimeout(() => this.sendArrow(), 2600);

        }else{ 
            this.next();
        }
       
    }

    animeRot(){
        this.game.add.tween(this.rot).to({
            y: [276, 260, 276, 260]
        }, 300, "Linear")
        .start(); 
    }

    
    update() {
       
    }

    next() {
        this._gen.next();
    }

     

    


}
