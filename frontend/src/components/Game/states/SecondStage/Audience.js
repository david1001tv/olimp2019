/* globals __DEV__ */
import Phaser from 'phaser';
import {smartSetHeight} from '../../utils';

export default class AudienceState extends Phaser.State {
    * gen() {
        this.game.displayDialogLine('Федосова', 'Доброго дня, Давиде!', () => this.next());
        yield;
        this.game.displayDialogLine('Ви', 'Вітаю, Ірина... Василівна... Я дуже радий, що поступив на вашу \
        кафедру!', () => this.next());
        yield;
        this.game.displayDialogLine('Федосова', 'Ми теж раді кожному студенту, який поступив до нас, та, \
        тим паче вже запам\'ятав імена викладачів.', () => this.next());
        yield;
        this.game.displayDialogLine('Ви', 'Дякую. Я вже намагаюсь бути кращим студентом.', () => this.next());
        this.setVisible(this.daveOne);
        this.setVisible(this.daveTwo);
        yield;
        this.game.displayDialogLine('Федосова', 'Це добре. Давай зараз подивимось на твої бали.', () => this.next());
        this.setVisible(this.daveOne);
        this.setVisible(this.daveTwo);
        this.setVisible(this.fedOne);
        this.setVisible(this.fedTwo);
        yield;
        this.game.displayDialogLine('Ви', 'Так, добре.', () => this.next());
        yield;
        this.game.nextState(this.score);
    }

    init() {
        this._gen = this.gen();
        this.game.phone.clearTodos();
        // this.game.phone.addTodos(todos);
    }

    preload() {
        this.load.image('bg', './assets/images/2-5 (audience)/bg-2-5.png');
        this.load.image('david-1', './assets/images/2-5 (audience)/d-sits-f1.png');
        this.load.image('david-2', './assets/images/2-5 (audience)/d-sits-f2.png');
        this.load.image('fed-1', './assets/images/2-5 (audience)/fed-1.png');
        this.load.image('fed-2', './assets/images/2-5 (audience)/fed-2.png');
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        this.daveOne = this.game.add.image(1230, 130, 'david-1');
        smartSetHeight(this.daveOne, 1000);
        this.daveTwo = this.game.add.image(1220, 100, 'david-2');
        smartSetHeight(this.daveTwo, 1000);
        this.daveTwo.visible = false;

        this.fedOne = this.game.add.image(275, 235, 'fed-1');
        smartSetHeight(this.fedOne, 550);
        this.fedOne.visible = false;
        this.fedTwo = this.game.add.image(275, 235, 'fed-2');
        smartSetHeight(this.fedTwo, 550);
        
        this.stage.disableVisibilityChange = true;
        this.next();
    }

    setVisible(obj){
        obj.visible = !obj.visible;
    }

    next() {
        this._gen.next();
    }
}