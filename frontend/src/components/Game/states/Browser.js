import Phaser from 'phaser';
import PubSub from 'pubsub-js';
import autobind from 'autobind-decorator';

export default class BrowserState extends Phaser.State {
    * gen() {

    }

    @autobind
    handleFormSubmit(_, msg) {
        if (msg === 'form-submitted') {
            this.game.nextState();
        }
    }

    init() {
        this.game.setFakeBrowserEnabled(true);
        this.game.phone.setEnabled(true);
        this.game.phone.clearTodos();
        this.game.phone.setTime('14:07');
        this.game.phone.setDate('02.07.18');
        this.game.phone.addTodo({
            id: 'BROWSER',
            text: 'Зареєструватися на сайті університету'
        });

        this.token = PubSub.subscribe('browser', this.handleFormSubmit);
    }

    preload() {

    }

    create() {

    }

    shutdown() {
        this.game.setFakeBrowserEnabled(false);
        PubSub.unsubscribe(this.token);
    }

    next() {
        this._gen.next();
    }
}