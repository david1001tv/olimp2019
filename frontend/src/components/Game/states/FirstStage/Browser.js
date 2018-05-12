import Phaser from 'phaser';
import PubSub from 'pubsub-js';
import autobind from 'autobind-decorator';

export default class BrowserState extends Phaser.State {
    * gen() {

    }

    @autobind
    handleBrowserEvent(_, event) {
        if (event === 'form-submitted') {
            this.game.phone.completeTodo('BROWSER');
        } else if (event === 'continue') {
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

        this.token = PubSub.subscribe('browser', this.handleBrowserEvent);
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