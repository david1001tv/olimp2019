import Phaser from 'phaser';
import FillwordsComponent from './FillWordsComponent';

import {smartSetHeight} from '../../../utils';
import {fillwordsObjects} from '../../../fillwords/fillwords';

export default class FillwordsState extends Phaser.State {
    * gen() {
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.icon.inputEnabled = true;
        this.icon.input.useHandCursor = true;
        this.icon.events.onInputDown.add(this.openWindow, this);
        yield;
    }

    init() {
        this._gen = this.gen();
        this.game.phone.clearTodos();
    }

    preload() {
        this.load.image('bg', './assets/images/fillwords/fillwords-bg.png');
        this.load.image('icon', './assets/images/fillwords/fillwords-icon.png');
        this.load.image('field', './assets/images/fillwords/fillwords-field.png');
        this.load.image('square', './assets/images/fillwords/norm-fillwords-square.png');
        this.load.image('professor', './assets/images/fillwords/professor.png');
    }

    create() {
        const bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        const icon = this.game.add.image(220, 280, 'icon');
        this.icon = icon;

        const field = this.game.add.image(600, 80, 'field');
        field.alpha = 0;
        this.field = field;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        const proff = this.game.add.sprite(3000, 0, 'professor');
        this.physics.arcade.enable(proff);
        proff.body.bounce.set(1);
        this.proff = proff;

        this.next();
    }

    shutdown() {
        
    }

    render() {

    }

    openWindow() {
        this.field.alpha = 1;
        this.icon.inputEnabled = false;
        this.inputs = new FillwordsComponent(this.game, fillwordsObjects, 642, 142, this.moveProff, this.proff);
    }

    moveProff(proff, text) {
        this.game.time.events.add(150, () => {
            this.game.displayDialogLine('Сетевик', text, () => {
                this.removeProff();
            });
        }, this);
        proff.body.moveTo(700, 1700, Phaser.ANGLE_LEFT);
    }

    next() {
        this._gen.next();
    }
}
