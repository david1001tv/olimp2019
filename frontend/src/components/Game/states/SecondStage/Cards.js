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

        this.game.displayDialogLine('Ви', 'Jija', () => this.next());
        yield;

        this.game.input.enabled = true;
        this.game.phone.setEnabled(true);
        yield;

        this.game.displayDialogLine('Ви', 'Готово. Тепер потрібно зареєструватися на сайті університету.', () => this.next());
        yield;

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
    }

    preload() {

        this.load.image('bg', './assets/images/2-7 (cards)/background.png');
        this.load.image('no', './assets/images/2-7 (cards)/no.png');
        this.load.image('yes', './assets/images/2-7 (cards)/yes.png');
        this.load.image('card', './assets/images/2-7 (cards)/card.png');

    }

    create() {
        this.SSF = {...SSF};
        for (let key in this.SSF) {
            this.SSF[key] = this.SSF[key].bind(this);
        }

        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        
        this.SSF.makeImageDrop(1520 , 0, 'yes');
        this.SSF.makeImageDrop(0, 0, 'no');

        this.cards = [];
        this.cardsIsRight = [true, false, true, false, true, false, true, false, true, false];
        let addx = 5;
        let addy = 3;
        for (let i = 0; i < 10; i++){
            if (this.cardsIsRight[i]){
                this.cards.push(this.SSF.makeImageDrop(750 + addx, 200 + addy, 'card', 1320, -100, 1500, 2080));
            }
            else {
                this.cards.push(this.SSF.makeImageDrop(750 + addx, 200 + addy, 'card', -200, -100, 1000, 2080));
            }

            addx += 5;
            addy += 3;
        }
       
        //let todoIds = ['header', 'banner', 'leftmenu', 'content', 'footer', 'logo', 'menu'];

        this.cards[0].inputEnabled = true;
        this.cards[0].input.useHandCursor = true;
        this.cards[0].input.pixelPerfectOver = true;
        this.cards[0].input.enableDrag(false, true, true, 1);
        this.activePart = this.cards[0];
        //this.cards[0].events.onDragStart.add(this.handleDragStart, this);
        this.cards[0].events.onDragStop.add(this.handleCheck, this, 0,  this.cards[0].first,  this.cards[0].second,  this.cards[0].third,  this.cards[0].fourth);

        this.stage.disableVisibilityChange = true;
        this.next();
    }

    handleCheck(currImg, currPointer, first, second, third, fourth){

        console.log(first, second, third, fourth);
        console.log(this.activePart.x, this.activePart.y);


        if (!this.isRight){
            this.game.input.enabled = false;

            let scannerRectangle = new Phaser.Rectangle(first, second, third, fourth);

            const {activePart} = this;

            if (this.activePart !== null) {
                if (Phaser.Rectangle.containsRect(activePart.getBounds(), scannerRectangle)) {
                    activePart.isRight = true;

                    let index = this.cards.indexOf(activePart);
                    if(index + 1 < this.cards.length){
                        this.cards[index + 1].inputEnabled = true;
                        this.cards[index + 1].input.useHandCursor = true;
                        this.cards[index + 1].input.pixelPerfectOver = true;
                        this.cards[index + 1].input.enableDrag(false, true, true, 1);
                        this.cards[index + 1].events.onDragStop.add(this.handleCheck, this, 0, this.cards[index + 1].first, this.cards[index + 1].second, this.cards[index + 1].third, this.cards[index + 1].fourth);
                    }

                    activePart.destroy();

                    this.game.displayDialogLine('Ви', '+');
                    this.game.phone.completeTodo(activePart.todoId);

                    this.activePart = this.cards[index + 1];
                } else {
                    this.game.displayDialogLine('Ви', 'Ой, щось кривувато вийшло. Спробую ще раз');
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

    next() {
        this._gen.next();
    }
}
