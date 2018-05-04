import Phaser from 'phaser';

export default class BrowserState extends Phaser.State {
    * gen() {

    }

    init() {
        this.game.setFakeBrowserEnabled(true);
        this.game.phone.clearTodos();
        this.game.phone.setTime('14:07');
        this.game.phone.setDate('02.07.18');
        this.game.phone.addTodo({
            id: 'BROWSER',
            text: 'Зареєструватися на сайті університету'
        });
    }

    preload() {

    }

    create() {

    }

    next() {
        this._gen.next();
    }
}