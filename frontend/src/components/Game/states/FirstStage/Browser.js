import Phaser from 'phaser';

export default class BrowserState extends Phaser.State {
    * gen() {

    }

    init() {
        this.game.setFakeBrowserEnabled(true);
        this.game.phone.clearTodos();
        this.game.phone.addTodo({
            id: 'BROWSER',
            text: 'Зареєструватися на сайті ПДТУ'
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