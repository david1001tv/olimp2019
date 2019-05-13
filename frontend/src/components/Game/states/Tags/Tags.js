import Phaser from 'phaser';
import InputComponent from './InputComponent'

export default class TagsState extends Phaser.State {
    * gen() {
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.phone.setEnabled(true);
        yield;

        this.game.nextState(this.score);
    }

    init() {
        this._gen = this.gen();
        this.game.phone.clearTodos();
    }

    preload() {
        this.load.image('bg', './assets/images/tags/bg.png');
        this.load.image('header', './assets/images/tags/header.png');
        this.load.image('nav', './assets/images/tags/nav.png');
        this.load.image('logo', './assets/images/tags/logo.png');
        this.load.image('body-1', './assets/images/tags/body-1.png');
        this.load.image('body-2', './assets/images/tags/body-2.png');
        this.load.image('footer', './assets/images/tags/footer.png');
        this.load.image('input', './assets/images/tags/input.png');
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        new InputComponent(1224, 220, 1234, 863, 'html', bg, this.game);

        this.next();
    }

    next() {
        this._gen.next();
    }
}
