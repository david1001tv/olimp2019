import Phaser from 'phaser';
import {smartSetHeight} from '../../../utils';
import Hand from './Hand';

const ARROWS_BOTTOM = 950;
const STATIC_ARROWS_TOP = 100;
const ARROWS_LEFT = 100;
const ARROWS_SIDE_PADDING = 30;
const ARROW_SIZE = 150;

const LEFT_ARROW = 0;
const UP_ARROW = 1;
const DOWN_ARROW = 2;
const RIGHT_ARROW = 3;

let globT = 0;
let globid = 0;
let checkid = 0;




export default class Scanner extends Phaser.State {
    async * gen() {
        this.game.input.enabled = true;
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;
        // описание 


        // this.game.displayDialogLine('Волошин В. С.', 'Секрети перемог в навчанні -\n Труд і прилежність назавжди.', () => this.next());
        // yield;
        // this.game.displayDialogLine('Волошин В. С.', 'Успіх в житті це не останнє,\n До чого ТИ дійдеш, зажди.', () => this.next());
        // yield;
        // this.game.displayDialogLine('Волошин В. С.', 'Етапи, іспити, тривоги -\n Нещастя ці такі малі.', () => this.next());
        // yield;
        // this.game.displayDialogLine('Волошин В. С.', 'Ти знайдеш шлях до перемоги,\n У кращем ВИШі на землі!', () => this.next());
        // yield;

        let fullDavid = this.createDavid();
        this.game.add.tween(fullDavid).to({alpha: 1}, 3000).start().onComplete.add(() => this.next());
        yield;

         
        // 3.. 2.. 1...
        this.startCountdown();
        setTimeout(() => this.next(), 4000);
        
        yield;

        this.createCursors();
     
       
        this.sendArrow();
        yield;
        this.yesT.destroy();
        this.noT.destroy();
        this.next();
        yield;
        this.game.displayDialogLine('Учитель', `ты прошел тест на ${this.porc} ты  ${this.porc > 50 ? 'не робот' : 'робот'}`, () => this.next());
        yield;


        this.game.camera.fade(0x000000, 2500, true);
        setTimeout(() => this.next(), 2500);
        yield;


        this.cleanUpCursors();
        this.game.music.pause();
        this.game.nextState();
    }

    constructor() {
        super();

        this.score = 50;
    }

    init() {
        this.activeDocument = null;

        this._gen = this.gen();

        this.game.phone.setEnabled(false);
    }

    preload() {

        
        


        this.load.image('bg', './assets/images/risovach.ru.jpg');
       

        this.load.image('d-shadow', './assets/images/robot.jpg');


       
    }

    startCountdown() {
        let count = 3;
        let countdownText = this.game.add.text(this.world.centerX, this.world.centerY, count.toString(), {
            font: 'Neucha',
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
        console.log('work');
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
        let fullDavid = this.game.add.image(900, 50, 'd-shadow');
        
         // это не трогать, а то пахать перестает
       // let fullDavid = this.game.add.group();
       
 
        fullDavid.alpha = 0;
        return fullDavid;
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        this.yesT = this.game.add.text(170, 30, "Да", {
            font: 'Neucha',
            fontSize: 90,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 10,
        });
       
        this.noT = this.game.add.text(500, 30, "Нет", {
            font: 'Neucha',
            fontSize: 90,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 10,
        });
        this.activeArrows = [];
        this.porc = 0;

        this.allOne = 0;

        this.flag = true;

        this.massText = [
            "программирование", "это", " процесс", "превращения", "алгоритма", "в", "нотацию", "написанную", "на", "языке", "программирования", "которая", "может", "быть", "выполнена", "компьютером"
        ];
 
        this.massText3 = [
            "программирование", "это", " процесс", "превращения", "книги","алгоритма", "в","форточку", "нотацию", "написанную", "на", "журнал", "языке",  "программирования", "которая", "может", "быть","кирпич", "выполнена","дом", "компьютером"
        ];


        this.checkedMass = [];



        this.next();
    }


    handleKeyDown(index) {
        
 
        // // робот открывает рот 
        switch (index) {
            case LEFT_ARROW:
                if(this.activeArrows[globid]._text == this.massText[checkid]){

                    if(this.flag) {
                        this.porc += 6.25;
                    }else{
                        this.flag =  true;
                    }
                    ++checkid;
                    console.log('yes');
                }else{
                    this.flag = false;
                }
                this.checkedMass.push(this.activeArrows[globid]._text);
                this.activeArrows[globid].destroy();
                this.yesT.setShadow(5, 5, 'rgba(36, 250, 7, 0.5)', 15);
                setTimeout( () => this.yesT.setShadow(), 500);
                globid++;
                
                break;
            case RIGHT_ARROW:
                let namev = globid;
                this.noT.setShadow(5, 5, 'rgba(250, 7, 7, 0.5)', 15);
                this.activeArrows[globid].destroy();
                setTimeout( () => this.noT.setShadow(), 500);
                if(this.activeArrows[globid]._text == this.massText[checkid]){
                    
                    ++checkid;
                }
                globid++;
                 
                break;
           
        }
       
         

    }

    generateArrow(text, index) {
        let arrow = this.game.add.text(350, ARROWS_BOTTOM, text,{
        font: 'Neucha',
        fontSize: 70,
        fill: 'white',
        stroke: 'black',
        strokeThickness: 10,});
        arrow.anchor.setTo(0.5, 0.5);
        arrow.angle = 0;
        arrow.index = index;

        arrow.inputEnabled = true;
        arrow.events.onInputDown.add(() => console.log(text));
        return arrow;
    }

    sendArrow() {
        let arrow = this.generateArrow(this.massText3[globT++], globT);
        this.activeArrows.push(arrow);
        this.allOne = arrow;
        this.game.add.tween(arrow)
            .to({y: 0}, 3000) // время за которое текст пролетает
            .start()
            .onComplete
            .add((e) => {
                if(this.activeArrows[globid]._text == this.massText[checkid]){
                    ++checkid;
                }
                e.destroy();
            });
        
        if(globT <= this.massText3.length){
            setTimeout(() => this.sendArrow(), 3000);

        }else{
          
            this.next();
        }
       
    }


    shutdown() {
        this.game.music.pause();
    }

    next() {
        this._gen.next();
    }

     

    


}
