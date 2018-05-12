import Phaser from 'phaser';
import { smartSetHeight } from '../../utils';

export default class ToLaboratoryState extends Phaser.State {
    * gen() {
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;


        this.game.displayDialogLine('Ви', 'Ольго Iгорiвно, вибачаюсь за запізнення, я…', () => this.next());
        yield;

        this.pronWorks.alpha = 0;
        let pronAngry = this.game.add.image(1055, 260, 'pronina-angry');
        smartSetHeight(pronAngry, 305);

        this.game.displayDialogLine('Проніна', 'Дякую, що взагалі прийшов. Проходь, сідай за вільний ком\'ютер \
        та починай робити лабу. Завдання на диску.', () => this.next());
        yield;

        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;
        
        this.game.nextState();
    }

    init() {
        this._gen = this.gen();
        this.game.phone.clearTodos();
        this.game.phone.setEnabled(false);
    }

    preload() {
        this.load.image('bg', './assets/images/3-2(programmer)/bg-3-2.png');
        this.load.image('pronina-angry', './assets/images/3-2(programmer)/pronina-sceptic.png');
        this.load.image('pronina-works', './assets/images/3-2(programmer)/pronina-works.png');
        this.load.image('d-backhand', './assets/images/3-2(programmer)/d-backhand.png');
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        this.pronWorks = this.game.add.image(1055, 260, 'pronina-works');
        smartSetHeight(this.pronWorks, 305);

        let dStand = this.game.add.image(1660, 240, 'd-backhand');
        smartSetHeight(dStand, 830);

        this.next();
    }

    next() {
        this._gen.next();
    }
}