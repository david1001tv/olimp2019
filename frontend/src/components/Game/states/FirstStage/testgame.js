import Phaser from 'phaser';
import PubSub from 'pubsub-js';
import autobind from 'autobind-decorator';

export default class testGame extends Phaser.State {
    * gen() {
      
    }

    @autobind
    handleBrowserEvent(_, event) {
        if (event === 'yes') {
            this.game.nextState();
        }

    }

    init() {
        this.game.testGameEnabled(true);
        this.token = PubSub.subscribe('goNext', this.handleBrowserEvent);
    }

    preload() {
        this.load.image('bg', './assets/images/bg.jpg');
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

    }

    shutdown() {
        this.game.testGameEnabled(false);
     
    }

   
}