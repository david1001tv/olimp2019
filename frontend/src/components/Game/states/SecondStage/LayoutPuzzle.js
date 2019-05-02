import Phaser from 'phaser';
import {smartSetHeight, smartSetWidth} from '../../utils';
import todos from '../../todos/Scanner';

const INACTIVE_Y = 940;


export default class Scanner extends Phaser.State {
    * gen() {
        this.game.input.enabled = false;
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.displayDialogLine('Ви', 'Веб-дизайнеры создают макеты сайтов в графических редакторах. Одним из самых популярных является Photoshop, которым Вы и воспользуетесь.', () => this.next());
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

        this.load.image('bg', './assets/images/2-xx (layout puzzle)/background.png');
        this.load.image('checkmark', './assets/images/2-xx (layout puzzle)/checkmark.png');

        this.load.image('header-big', './assets/images/2-xx (layout puzzle)/header-big.png');
        this.load.image('header-small', './assets/images/2-xx (layout puzzle)/header-small.png');
        
        this.load.image('banner-big', './assets/images/2-xx (layout puzzle)/banner-big.png');
        this.load.image('banner-small', './assets/images/2-xx (layout puzzle)/banner-small.png');

        this.load.image('content-big', './assets/images/2-xx (layout puzzle)/content-big.png');
        this.load.image('content-small', './assets/images/2-xx (layout puzzle)/content-small.png');

        this.load.image('leftmenu-big', './assets/images/2-xx (layout puzzle)/leftmenu-big.png');
        this.load.image('leftmenu-small', './assets/images/2-xx (layout puzzle)/leftmenu-small.png');

        this.load.image('footer-big', './assets/images/2-xx (layout puzzle)/footer-big.png');   
        this.load.image('footer-small', './assets/images/2-xx (layout puzzle)/footer-small.png');

        this.load.image('menu-big', './assets/images/2-xx (layout puzzle)/menu-big.png');   
        this.load.image('menu-small', './assets/images/2-xx (layout puzzle)/menu-small.png');

        this.load.image('logo-big', './assets/images/2-xx (layout puzzle)/logo-big.png');   
        this.load.image('logo-small', './assets/images/2-xx (layout puzzle)/logo-small.png');

    }

    create() {

        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        let minHeader = this.game.add.image(0, INACTIVE_Y, 'header-small');
        minHeader.first = 250;
        minHeader.second = 150;
        minHeader.third = 880;
        minHeader.fourth = 100;
        minHeader.type = 0;

        let minBanner = this.game.add.image(0, INACTIVE_Y, 'banner-small');
        minBanner.first = 250;
        minBanner.second = 240;
        minBanner.third = 880;
        minBanner.fourth = 240;
        minBanner.type = 1;

        
        let minLeftMenu = this.game.add.image(0, INACTIVE_Y, 'leftmenu-small');
        minLeftMenu.first = 250;
        minLeftMenu.second = 470;
        minLeftMenu.third = 190;
        minLeftMenu.fourth = 430;
        minLeftMenu.type = 2;


        let minContent = this.game.add.image(0, INACTIVE_Y, 'content-small');
        minContent.first = 425;
        minContent.second = 470;
        minContent.third = 695;
        minContent.fourth = 435;
        minContent.type = 3;

        let minFooter = this.game.add.image(0, INACTIVE_Y, 'footer-small');
        minFooter.first = 250;
        minFooter.second = 890;
        minFooter.third = 880;
        minFooter.fourth = 145;
        minFooter.type = 4;

        let minLogo = this.game.add.image(0, INACTIVE_Y, 'logo-small');
        minLogo.first = 250;
        minLogo.second = 150;
        minLogo.third = 175;
        minLogo.fourth = 100;
        minLogo.type = 5;

        let minMenu = this.game.add.image(0, INACTIVE_Y, 'menu-small');
        minMenu.first = 490;
        minMenu.second = 175;
        minMenu.third = 470;
        minMenu.fourth = 70;
        minMenu.type = 6;

        let mass = [minHeader, minBanner, minLeftMenu, minContent, minFooter, minLogo, minMenu];

        let todoIds = ['header', 'banner', 'leftmenu', 'content', 'footer', 'logo', 'menu'];
        this.mass = mass;

        let x = 1386;
        let y = 265;
        mass.forEach((part, index) => {
            part.x = part.originalX = x;
            part.y = part.originalY = y;
            y += part.height;

            part.todoId = todoIds[index];

        });

        this.mass[0].inputEnabled = true;
        this.mass[0].input.useHandCursor = true;
        this.mass[0].input.pixelPerfectOver = true;
        this.mass[0].input.enableDrag(false, true, true, 1);
        this.mass[0].events.onDragStart.add(this.handleDragStart, this);
        this.mass[0].events.onDragStop.add(this.handleCheck, this, 0,  this.mass[0].first,  this.mass[0].second,  this.mass[0].third,  this.mass[0].fourth);

        this.stage.disableVisibilityChange = true;
        this.next();
    }

    activatePart(part) {
        this.activePart = part;
        part.loadTexture(`${part.key.split('-')[0]}-big`);
        part.bringToTop();
    }

    deactivatePart(part) {
        part.loadTexture(`${part.key.split('-')[0]}-small`);
        part.x = part.originalX;
        part.y = INACTIVE_Y;
    }

    handleDragStart(part) {
        if (this.activePart !== part) {
            if (this.activePart !== null) {
                this.deactivatePart(this.activePart); 
            }
            this.activatePart(part);
        }     
    }

    handleCheck(currImg, currPointer, first, second, third, fourth){

        console.log(first, second, third, fourth);

        if (!this.isRight){
            this.game.input.enabled = false;

            let scannerRectangle = new Phaser.Rectangle(first, second, third, fourth);

            const {activePart} = this;

            if (this.activePart !== null) {

                if (Phaser.Rectangle.containsRect(activePart.getBounds(), scannerRectangle)) {
                    activePart.isRight = true;

                    if (activePart.type + 1 < this.mass.length){
                        this.mass[activePart.type + 1].inputEnabled = true;
                        this.mass[activePart.type + 1].input.useHandCursor = true;
                        this.mass[activePart.type + 1].input.pixelPerfectOver = true;
                        this.mass[activePart.type + 1].input.enableDrag(false, true, true, 1);
                        this.mass[activePart.type + 1].events.onDragStart.add(this.handleDragStart, this);
                        this.mass[activePart.type + 1].events.onDragStop.add(this.handleCheck, this, 0, this.mass[activePart.type + 1].first, this.mass[activePart.type + 1].second, this.mass[activePart.type + 1].third, this.mass[activePart.type + 1].fourth);
                    }
                    let checkmark = this.game.add.image(activePart.originalX + 6, activePart.originalY + 3, 'checkmark');
                    smartSetHeight(checkmark, 45);

                    activePart.inputEnabled = false;

                    this.game.displayDialogLine('Ви', '+');
                    this.game.phone.completeTodo(activePart.todoId);

                    this.activePart = null;
                } else {
                    this.game.displayDialogLine('Ви', 'Ой, щось кривувато вийшло. Спробую ще раз');
                }
            }

            if (this.mass.every(e => e.isRight)) {
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
