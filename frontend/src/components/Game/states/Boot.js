import Phaser from 'phaser';
import WebFont from 'webfontloader';
import config from '../config';
import {getMessagesForState} from '../MailTexts';

let INITIAL_STATE = 'Scanner';

export default class BootState extends Phaser.State {
    init() {
        this.fontsReady = false;
        this.fontsLoaded = this.fontsLoaded.bind(this);
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.parentIsWindow = true;
        window.getMessagesForState = getMessagesForState;
        this.game.phone.setMessages(getMessagesForState(INITIAL_STATE, Object.keys(this.game.state.states)));
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
            this.state.start(INITIAL_STATE);
        }
        if (!config.webfonts.length) {
            this.state.start(INITIAL_STATE);
        }
    }

    fontsLoaded() {
        this.fontsReady = true;
    }
}
