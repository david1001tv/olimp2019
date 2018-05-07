import Phaser from 'phaser';
import WebFont from 'webfontloader';
import config from '../config';
import { getMessagesForState } from '../MailTexts';

export default class BootState extends Phaser.State {
    init(nextState) {
        this.nextState = nextState;
        this.fontsReady = false;
        this.fontsLoaded = this.fontsLoaded.bind(this);
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.parentIsWindow = true;
        this.game.phone.setMessages(getMessagesForState(this.nextState, Object.keys(this.game.state.states)));
    }

    preload() {
        if (config.webfonts.length) {
            WebFont.load({
                google: {
                    families: config.webfonts
                },
                active: this.fontsLoaded
            });
        }
    }

    render() {
        if (config.webfonts.length && this.fontsReady) {
            this.state.start('CodeEditor');
        }
        if (!config.webfonts.length) {
            this.state.start('CodeEditor');
        }
    }

    fontsLoaded() {
        this.fontsReady = true;
    }
}