import Phaser from 'phaser';
import WebFont from 'webfontloader';
import config from '../config';

export default class BootState extends Phaser.State {
    init() {
        this.fontsReady = false;
        this.fontsLoaded = this.fontsLoaded.bind(this);
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.parentIsWindow = true;
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
            this.state.start('Docs');
        }
        if (!config.webfonts.length) {
            this.state.start('Docs');
        }
    }

    fontsLoaded() {
        this.fontsReady = true;
    }
}
